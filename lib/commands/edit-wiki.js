const { exec, openCohort, state, config } = require('../')
const { FILES_PATH } = config
module.exports = {
    'edit-wiki': async (name) => {
        exec(`
            cd ${FILES_PATH}
            cd "Wiki"
            open . -a "${state['code-editor']}"
        `)
    }
}