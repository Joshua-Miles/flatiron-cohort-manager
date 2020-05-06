const path = require('path')
const fs = require('fs')
module.exports = ({ config, }) =>  (selectedCohort, selectedLecture) => {
    const { FILES_PATH } = config
    const lectureStatePath = path.join(FILES_PATH, selectedCohort, "Lecture-Code", selectedLecture, ".state.json");
    try {
        let lectureState = fs.readFileSync(lectureStatePath).toString()
        return JSON.parse(lectureState)
    } catch {
        return {}
    }
}