const { console, state, inflection, config, fs, exec, openCohort } = require('../')
const path = require("path")
const ncp = require('ncp').ncp;
const { toHumanized, toTitleCase } = inflection 
const { FILES_PATH } = config 

module.exports = {
    'new-lecture': async () => {
        const { activeCohort } = state
        const lectureName = await console.prompt(`Lecture Name: ${activeCohort['lecture-number']}-`)
        const lectureFolderName = `${activeCohort['lecture-number']}-${lectureName}`
        const fromTemplate = await console.prompt('Would you like to create from a template?', [
            'Yes',
            'No'
        ])
        if(fromTemplate == 'Yes'){
            const selectedCohort = await console.prompt('Please select a cohort:', state.cohorts.map( cohort => cohort.name))
            const selectedLecturesPath = path.join(FILES_PATH, selectedCohort, "Lecture-Code");
            const lectureNames = await fs.readdirSync(selectedLecturesPath)
            const selectedLectureName = await console.prompt('Please select a lecture:', lectureNames)
            const source = path.join(selectedLecturesPath, selectedLectureName)
            const destination = path.join(FILES_PATH, activeCohort.name, "Lecture-Code", lectureFolderName)
            await new Promise ( resolve => ncp(source, destination, resolve))
        } else {
            const lectureTitle = toTitleCase(toHumanized(lectureName))
            exec(`
                ${openCohort(activeCohort.name)}
                cd "Lecture-Code"
                mkdir "${lectureFolderName}"
                cd "${lectureFolderName}"
                echo "# ${lectureTitle}" >> "README.md"
            `)
        }
        activeCohort['lecture-number']++
        exec(`
            ${openCohort(activeCohort.name)}
            cd "Lecture-Code/${lectureFolderName}"
            open . -a "${state['code-editor']}"
            open README.md -a "${state['markdown-editor']}"
        `)
    }
}