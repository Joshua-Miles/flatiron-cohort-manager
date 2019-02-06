const exec = require('util').promisify(require('child_process').exec)
const fs = require('fs')
const console = require('../console')

const lib = {
    state: require('./state'),
    config: require('./config'),
    inflection: require('./inflection'),
    createLink: (...args) => require('./bashUtils/createLink')(lib)(...args),
    openCohort: (...args) => require('./bashUtils/openCohort')(lib)(...args),
    lectureNamesFor: (...args) => require('./fileUtils/lectureNamesFor')(lib)(...args),
    openLink: (...args) => require('./bashUtils/openLink')(lib)(...args),
    console: console,
    fs: fs,
    exec: exec
}

require('./installation')(lib)

module.exports = lib