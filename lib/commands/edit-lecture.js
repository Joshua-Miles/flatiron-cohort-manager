const { console, state, config, exec, selectLecture } = require('../')
const { FILES_PATH } = config;

module.exports = {
    'edit-lecture': async () => {
        const selectedLectureName = await selectLecture()
        exec(`
            cd ${FILES_PATH}
            cd "Lecture-Code/${selectedLectureName}"
            open . -a "${state['code-editor']}"
        `)
    }
}