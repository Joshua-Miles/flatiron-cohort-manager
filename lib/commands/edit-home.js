const { exec, openCohort, state } = require('../')

module.exports = {
    'edit-home [name]': async (name) => {
        exec(`
            ${openCohort(name)}
            code homeTemplate.ejs
        `)
    }
}