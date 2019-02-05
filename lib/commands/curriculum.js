const { openLink, config, exec } = require('../')
const { FILES_PATH } = config
module.exports = {
    'curriculum': () => {
        exec(`
            cd ${FILES_PATH}
            ${openLink('curriculum')}
        `)
    }
}