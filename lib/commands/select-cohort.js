const { state, console } = require('../')
module.exports = {
    'select-cohort': async () => {
        let cohortNames = state.cohorts.map( cohort => cohort.name)
        state.activeCohortName = await console.prompt('Select Cohort: ', cohortNames)
    }
}