const { console, state, inflection, config, exec, openCohort, lectureNamesFor } = require('../')
const path = require("path")
const ncp = require('ncp').ncp;
const { toHumanized, toTitleCase } = inflection 
const { FILES_PATH } = config 

module.exports = {
    'new-lecture [lecture-number]': async (number) => {
        if(number === undefined) number = await generateLectureNumber()
        const { activeCohort } = state
        const lectureNumber = `${number}`.padStart(2, '0')
        const lectureName = await console.prompt(`Lecture Name: ${lectureNumber}-`)
        const lectureFolderName = `${lectureNumber}-${lectureName}`
        const fromTemplate = await console.prompt('Would you like to create from a template?', [
            'Yes',
            'No'
        ])
        if(fromTemplate == 'Yes'){
            const selectedCohort = await console.prompt('Please select a cohort:', state.cohorts.map( cohort => cohort.name))
            const lectureNames = await lectureNamesFor(selectedCohort)
            const selectedLectureName = await console.prompt('Please select a lecture:', lectureNames)
            const source = path.join(FILES_PATH, selectedCohort, 'Lecture-Code', selectedLectureName)
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
        exec(`
            ${openCohort(activeCohort.name)}
            cd "Lecture-Code/${lectureFolderName}"
            open . -a "${state['code-editor']}"
            open README.md -a "${state['markdown-editor']}"
        `)
    }
}

const generateLectureNumber = async () => {
    let lectureNames = await lectureNamesFor(state.activeCohort.name)
    let lastLectureName = lectureNames[lectureNames.length - 1]
    let [ number ] = lastLectureName ? lastLectureName.split('-') : [ 0 ]
    return parseInt(number) + 1
}