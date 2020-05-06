const aperture = require('aperture');
const hbjs = require('handbrake-js')

module.exports = ({ state, console }) => async (inputPath, outputPath) => {
    inputPath = `/Users/joshua.miles/Documents/My-Cohorts/houston-se-030920/Lecture-Videos/r.3-c-javascript-refactoring-dep.mp4`
    outputPath = `/Users/joshua.miles/Documents/My-Cohorts/houston-se-030920/Lecture-Videos/r.3-c-javascript-refactoring.mp4`
    hbjs.spawn({ input: inputPath, output: outputPath, optimize: true, quality: 22 })
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
}