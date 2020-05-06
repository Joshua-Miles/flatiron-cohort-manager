const aperture = require('aperture');
module.exports = ({ state, console }) =>  async () => {
    const audioDevices = await aperture.audioDevices() 
    if(!state.selectedAudioDevice){
        let deviceNames = audioDevices.map( device => device.name )
        state.selectedAudioDevice = await console.prompt('Which audio device would you like to use while recording?:', deviceNames)
    }
    const audioDevice = audioDevices.find( device => device.name === state.selectedAudioDevice )
    let recording = aperture()
    await recording.startRecording({
        fps: 30,
        audioDeviceId: audioDevice.id,
        videoCodec: 'h264'

    })

    return {
        stop: async () => {
            let filePath = await recording.stopRecording()
            return filePath
        }
    }
}