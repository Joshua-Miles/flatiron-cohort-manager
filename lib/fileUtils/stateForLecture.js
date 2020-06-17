const path = require('path')
const fs = require('fs')
module.exports = ({ config, }) =>  (arg1, arg2) => {
    const { FILES_PATH } = config
    let selectedLecture, base;
    if(arg2 !== undefined){
        base = path.join(FILES_PATH, arg1)
        selectedLecture = arg2
    } else {
        base = FILES_PATH
        selectedLecture = arg1
    }
    const lectureStatePath = path.join(base, "Lecture-Code", selectedLecture, ".state.json");
    try {
        let lectureState = fs.readFileSync(lectureStatePath).toString()
        return JSON.parse(lectureState)
    } catch {
        return {}
    }
}