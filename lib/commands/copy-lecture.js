const path = require('path')
const { console, state, exec, openCohort, selectLecture, config } = require('../')
const { FILES_PATH } = config 
const ncp = require('ncp').ncp;

module.exports = {
    'copy-lecture [lecture-name]': async (selectedLectureName) => {
        const { activeCohort } = state
        selectedLectureName = selectedLectureName || await selectLecture()
        const source = path.join(FILES_PATH, 'Lecture-Code', selectedLectureName)
        const destination = path.join(FILES_PATH, activeCohort.name, "Lecture-Code", selectedLectureName)
        await new Promise ( resolve => ncp(source, destination, resolve))
        exec(`
            ${openCohort(activeCohort.name)}
            cd "Lecture-Code/${selectedLectureName}"
            open . -a "${state['code-editor']}"
        `)
    }
}