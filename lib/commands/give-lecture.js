const { console, exec, recordLecture, selectLecture, openCohort, state } = require('../')

module.exports = {
    'give-lecture': async () => {
        const { activeCohort } = state;
        const selectedLectureName = await selectLecture()
        await exec(`cohorts copy-lecture ${selectedLectureName}`)
        await console.prompt('Waiting to record...', [ 'Start' ])
        await recordLecture(selectedLectureName)
        await exec(`
            ${openCohort(activeCohort.name)}
            cd "Lecture-Code/${selectedLectureName}"
            git add . && git commit -m "-" && git push
        `)
    }
}