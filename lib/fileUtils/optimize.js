const hbjs = require('handbrake-js')

module.exports = ({ state, console }) => async (inputPath, outputPath) => {
    // inputPath = `/Users/joshua.miles/Documents/My-Cohorts/houston-se-030920/Lecture-Videos/r.3-c-javascript-refactoring-dep.mp4`
    // outputPath = `/Users/joshua.miles/Documents/My-Cohorts/houston-se-030920/Lecture-Videos/r.3-c-javascript-refactoring.mp4`
    return new Promise( resolve => {
        hbjs.spawn({ input: inputPath, output: outputPath, optimize: true, quality: 22, encoder: 'x264'})
            .on('error', err => {
                console.log(err)
            })
            .on('progress', progress => {
                console.log(
                    'Percent complete: %s, ETA: %s',
                    progress.percentComplete,
                    progress.eta
                )
            })
            .on('complete', () => {
                resolve()
            })
    })
}