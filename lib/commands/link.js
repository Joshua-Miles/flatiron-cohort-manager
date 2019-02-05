const { state, createLink, openCohort, exec, config } = require('../')
module.exports = {
    'link <resource> <url> [name]': (resource, url, name) => {
        exec(`
            ${openCohort(name)}
            ${createLink(resource, url)}
        `)
    }
}