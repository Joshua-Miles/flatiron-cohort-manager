const path = require('path')
const fs = require('fs')
module.exports = ({ config, }) =>  (selectedCohort, selectedLecture, newState) => {
    const { FILES_PATH } = config
    const lectureStatePath = path.join(FILES_PATH, selectedCohort, "Lecture-Code", selectedLecture, ".state.json");
    let lectureState;
    try {
        let rawState = fs.readFileSync(lectureStatePath).toString()
        lectureState = JSON.parse(rawState)
    } catch {
        lectureState = {}
    }
    Object.assign(lectureState, newState)
    fs.writeFileSync(lectureStatePath, JSON.stringify(lectureState))
}