const { state } = require('..')
module.exports = {
    'set <variable> <value> ': (variable, value) => {
        switch(variable){
            case 'active-cohort':
                state.activeCohort = value
            break
            case 'code-editor':
                state[variable] = value
            break
            case 'markdown-editor':
                state[variable] = value
            break;
            case 'lecture-number':
                state.activeCohort[variable] = value
            break;
        }
    }
}