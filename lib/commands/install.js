const { state, exec, config, createLink } = require('..')
const { FILES_PATH } = config
module.exports = {
    'install <name> <Learn ID>': (name, learnID, togetherID) => {
        exec(`
            cd "${FILES_PATH}"
            mkdir "${name}"
            cd "${name}"
            mkdir "Lecture-Videos"
            git clone "https://github.com/learn-co-curriculum/${name}.git" "Home-Page"
            git clone "https://github.com/learn-co-students/${name}.git" "Lecture-Code"
            ${createLink(`https://learn.co/batches/${learnID}/progress`, 'progress')}
            ${createLink(`https://learn.co/admin/assignments/search/assignments?assignmentName=${name}`, 'assignments')}
            ${createLink(`https://github.com/learn-co-curriculum/${name}`, 'home')}
        `)

        const newCohort = { name, learnID, togetherID }
        state.cohorts = [ ...state.cohorts, newCohort]
        state.activeCohortName = name

    }
}