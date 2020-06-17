const path = require('path')
const { state, selectLecture, recordLecture } = require('../')
module.exports = {
    'record-lecture': async () => {
        const { activeCohort } = state;
        const selectedLectureName = await selectLecture(activeCohort.name)
        await recordLecture(selectedLectureName)
    }
}