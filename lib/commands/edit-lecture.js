const { console, state, exec, openCohort, lectureNamesFor } = require('../')

module.exports = {
    'edit-lecture': async () => {
        const lectureNames = await lectureNamesFor(state.activeCohort.name)
        const selectedLectureName = await console.prompt('Please select a lecture:', lectureNames)
        exec(`
            ${openCohort(state.activeCohort.name)}
            cd "Lecture-Code/${selectedLectureName}"
            open . -a "${state['code-editor']}"
            open README.md -a "${state['markdown-editor']}"
        `)
    }
}