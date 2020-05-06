const path = require('path')
const { console, state, exec, optimize, openCohort, inflection, uploadVideo, lectureNamesFor, recordScreen, saveStateForLecture, writeHomePage, config } = require('../')
const { FILES_PATH } = config
const { toHumanized } = inflection

module.exports = {
    'record-lecture': async () => {
        const { activeCohort } = state;
        const lectureNames = await lectureNamesFor(activeCohort.name)
        const selectedLectureName = await console.prompt('Please select a lecture:', lectureNames)
        const recording = await recordScreen()
        await console.prompt('Recording Screen...', [ 'Stop' ])
        const tempPath = await recording.stop()
        const recordingPath = path.join(FILES_PATH, activeCohort.name, 'Lecture-Videos', `${selectedLectureName}.mp4`)
        await optimize(tempPath, recordingPath)
        // await exec(`
        //     mv ${tempPath} ${recordingPath}
        // `)
        // const youtubeVideo = await uploadVideo(`${toHumanized(selectedLectureName)} (${activeCohort.name})`, recordingPath)
        // const videoURL = `https://www.youtube.com/watch?v=${youtubeVideo.id}`
        // await saveStateForLecture(activeCohort.name, selectedLectureName, { videoURL })
        // await writeHomePage()
    }
}