const { exec, openCohort, state } = require('../')

module.exports = {
    'edit home [name]': async (name) => {
        exec(`
            ${openCohort(name)}
            cd "Home-Page"
            open . -a "${state['code-editor']}"
            open README.md -a "${state['markdown-editor']}"
        `)
    }
}