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
    lectureTemplateNames: (...args) => require('./fileUtils/lectureTemplateNames')(lib)(...args),
    stateForLecture: (...args) => require('./fileUtils/stateForLecture')(lib)(...args),
    selectLecture: (...args) => require('./fileUtils/selectLecture')(lib)(...args),
    recordLecture: (...args) => require('./fileUtils/recordLecture')(lib)(...args),
    writeHomePage: (...args) => require('./fileUtils/writeHomePage')(lib)(...args),
    recordScreen: (...args) => require('./fileUtils/recordScreen')(lib)(...args),
    optimize: (...args) => require('./fileUtils/optimize')(lib)(...args),
    uploadVideo: (...args) => require('./fileUtils/uploadVideo')(lib)(...args),
    saveStateForLecture: (...args) => require('./fileUtils/saveStateForLecture')(lib)(...args),
    openLink: (...args) => require('./bashUtils/openLink')(lib)(...args),
    console: console,
    fs: fs,
    exec: exec
}

require('./installation')(lib)

module.exports = lib