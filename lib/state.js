const { DATABASE_PATH } = require('./config')
const data = require('./Database')(DATABASE_PATH)

Object.defineProperty(data, 'activeCohort', {
    get: function(){
        return this.cohorts.find( cohort => cohort.name === this.activeCohortName)
    },
    set: function(value) {
        this.cohorts = this.cohorts.map( cohort => {
            if(cohort.name === this.activeCohortName){
                return value
            } else {
                return cohort
            }
        })
    }
})

module.exports = data