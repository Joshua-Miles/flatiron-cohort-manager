const homedir = require('os').homedir();
module.exports = {
     DATABASE_PATH: `${homedir}/.cohorts.db.json`,
     FILES_PATH: `${homedir}/Documents/My-Cohorts`
}