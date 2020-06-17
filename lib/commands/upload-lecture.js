const path = require('path')
const { console, state, inflection, uploadVideo, lectureNamesFor, saveStateForLecture, writeHomePage, config, selectLecture } = require('../')
const { FILES_PATH } = config
const { toTitleCase } = inflection

module.exports = {
    'upload-lecture': async () => {
        const { activeCohort } = state;
        const selectedLectureName = await selectLecture()
        const recordingPath = path.join(FILES_PATH, activeCohort.name, 'Lecture-Videos', `${selectedLectureName}.mp4`)
        const youtubeVideo = await uploadVideo(`${toTitleCase(selectedLectureName.split('-').slice(1).join(' '))} (${activeCohort.name})`, recordingPath)
        const videoURL = `https://www.youtube.com/watch?v=${youtubeVideo.id}`
        await saveStateForLecture(activeCohort.name, selectedLectureName, { videoURL })
        await writeHomePage()
    }
}