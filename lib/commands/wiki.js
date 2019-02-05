const { openLink, config, exec } = require('../')
const { FILES_PATH } = config
module.exports = {
    'wiki': () => {
        exec(`
            cd ${FILES_PATH}
            ${openLink('wiki')}
        `)
    }
}