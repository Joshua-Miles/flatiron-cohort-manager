const { console, state, config, fs, exec, openCohort } = require('../')
const path = require("path")
const { FILES_PATH } = config 

module.exports = {
    'edit-lecture': async () => {
        const selectedCohort = state.activeCohort.name
        const selectedLecturesPath = path.join(FILES_PATH, selectedCohort, "Lecture-Code");
        const lectureNames = await fs.readdirSync(selectedLecturesPath)
        const selectedLectureName = await console.prompt('Please select a lecture:', lectureNames)
        
        exec(`
            ${openCohort(selectedCohort)}
            cd "Lecture-Code/${selectedLectureName}"
            open . -a "${state['code-editor']}"
            open README.md -a "${state['markdown-editor']}"
        `)
    }
}