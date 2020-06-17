const path = require('path')
const fs = require('fs')
module.exports = ({ config, }) =>  async (selectedCohort) => {
    const { FILES_PATH } = config
    const selectedLecturesPath = path.join(FILES_PATH, selectedCohort, "Lecture-Code");
    const lectureNames = (await fs.readdirSync(selectedLecturesPath)).filter(name => !name.startsWith('.') && !name.endsWith('.md'))
    return lectureNames
}