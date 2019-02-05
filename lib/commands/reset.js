const { config, exec } = require('..')
const { DATABASE_PATH, FILES_PATH } = config
const fs = require('fs')
module.exports = {
    'reset': async () => {
        fs.unlinkSync(DATABASE_PATH)
        let result = await exec(`sudo rm -rf ${FILES_PATH}`)
    }
}