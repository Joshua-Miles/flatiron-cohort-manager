const path = require('path')
const { console, state, exec, openCohort, lectureTemplateNames, config } = require('../')
const { FILES_PATH } = config 
const ncp = require('ncp').ncp;

module.exports = {
    'copy-lecture': async () => {
        const { activeCohort } = state
        const lectureNames = await lectureTemplateNames()
        const selectedLectureName = await console.prompt('Please select a lecture:', lectureNames)
        const source = path.join(FILES_PATH, 'Lecture-Code', selectedLectureName)
        const destination = path.join(FILES_PATH, activeCohort.name, "Lecture-Code", selectedLectureName)
        await new Promise ( resolve => ncp(source, destination, resolve))
        // exec(`
        //     ${openCohort(state.activeCohort.name)}
        //     cd "Lecture-Code/${selectedLectureName}"
        //     open . -a "${state['code-editor']}"
        //     open "LECTURE NOTES.md" -a "${state['markdown-editor']}"
        // `)
    }
}