const { console, state, inflection, config, exec, openCohort, lectureNamesFor } = require('../')
const path = require("path")
const ncp = require('ncp').ncp;
const { toHumanized, toTitleCase } = inflection
const { FILES_PATH } = config

const lectureNotesTemplate = name =>  `# ${name}

**Time: 1:30** 

**FormativeEducation Deck:** _


### Learning Goals:
- 


### Activation 

##### Time: 0:00
- 



### Learning Goal 1: _

##### Time: 0:20

##### Demonstrate 
- 


### Learning Goal 2: _
##### Time: 0:30

##### Demonstrate
- 


### Learning Goal 3: _

##### Time: 0:50

##### Demonstrate

- 


##### Vocabulary
- 

`

let readmeTemplate = name => `# ${name}

### Deliverables
- 

`

module.exports = {
    'new-lecture [lecture-number]': async (number) => {
        if (number === undefined) number = await generateLectureNumber()
        const { activeCohort } = state
        const lectureName = await console.prompt(`Lecture Name: `)
        const lectureFolderName = `${lectureName}`
        const module = await console.prompt('What module is this lecture a part of?', [
            'Module 1',
            'Module 2',
            'Module 3',
            'Module 4',
            'Module 5',
            'Survey',
            'Misc'
        ])
        const lectureTitle = toTitleCase(toHumanized(lectureName))
        await exec(`
            cd ${FILES_PATH}
            cd "Lecture-Code"
            mkdir "${lectureFolderName}"
            cd "${lectureFolderName}"
            echo "${lectureNotesTemplate(lectureTitle)}" >> "LECTURE NOTES.md"
            echo "${readmeTemplate(lectureTitle)}" >> "README.md"
            echo '{"module":"${module}"}' >> ".state.json"
        `)
        exec(`
            cd ${FILES_PATH}
            cd "Lecture-Code/${lectureFolderName}"
            open . -a "${state['code-editor']}"
        `)
    }
}

const generateLectureNumber = async () => {
    let lectureNames = await lectureNamesFor(state.activeCohort.name)
    let lastLectureName = lectureNames[lectureNames.length - 1]
    let [number] = lastLectureName ? lastLectureName.split('-') : [0]
    return parseInt(number) + 1
}