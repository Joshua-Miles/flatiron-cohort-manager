const { createLink, openCohort, exec } = require('../')
module.exports = {
    'link <resource> <url> [name]': (resource, url, name) => {
        exec(`
            ${openCohort(name)}
            ${createLink(url, resource)}
        `)
    }
}