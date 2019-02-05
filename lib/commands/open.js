const { exec, openCohort, openLink, console, state, createLink, } = require('../')
module.exports = {
    'open <resource> [name]':  (resource, name = state.activeCohortName) => {        
        exec(`
            ${openCohort(name)}
            ${openLink(resource)}
        `).catch( async err => {
            let shouldAddLink = await console.prompt(`Could not find ${resource} for ${name}. Would you like to link it? (Y/N)`)
            if(['y', 'yes'].includes(shouldAddLink.toLowerCase())){
                let url =  await console.prompt('HTTP Address: ')
                exec(`
                    ${openCohort(name)}
                    ${createLink(url, resource)}
                    ${openLink(resource)}
                `)
            }
        })
    }
}