const { console, state, exec, openCohort, selectLecture } = require('../')

module.exports = {
    'open-lecture': async () => {
        const selectedLectureName = await selectLecture(state.activeCohort.name)
        exec(`
            ${openCohort(state.activeCohort.name)}
            cd "Lecture-Code/${selectedLectureName}"
            open . -a "${state['code-editor']}"
        `)
    }
}