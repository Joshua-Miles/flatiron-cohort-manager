const path = require('path')
module.exports = ({ console, state, optimize, uploadVideo, recordScreen, saveStateForLecture, writeHomePage, config, inflection }) => async (selectedLectureName) => {
    const { FILES_PATH } = config
    const { toTitleCase } = inflection
    const { activeCohort } = state
    const recording = await recordScreen()
    await console.prompt('Recording Screen...', ['Stop'])
    const tempPath = await recording.stop()
    const recordingPath = path.join(FILES_PATH, activeCohort.name, 'Lecture-Videos', `${selectedLectureName}.mp4`)
    await optimize(tempPath, recordingPath)
    const youtubeVideo = await uploadVideo(`${toTitleCase(selectedLectureName.split('-').slice(1).join(' '))} (${activeCohort.name})`, recordingPath)
    const videoURL = `https://www.youtube.com/watch?v=${youtubeVideo.id}`
    await saveStateForLecture(activeCohort.name, selectedLectureName, { videoURL })
    await writeHomePage()
}