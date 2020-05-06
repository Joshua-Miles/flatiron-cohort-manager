const { state, console, writeHomePage } = require('../')
module.exports = {
    'refresh-home': async () => {
       writeHomePage()
    }
}