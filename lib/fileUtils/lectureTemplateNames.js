const path = require('path')
const fs = require('fs')
module.exports = ({ config, }) =>  async () => {
    const { FILES_PATH } = config
    const selectedLecturesPath = path.join(FILES_PATH, "Lecture-Code");
    const lectureNames = (await fs.readdirSync(selectedLecturesPath)).filter(name => !name.startsWith('.'))
    return lectureNames
}