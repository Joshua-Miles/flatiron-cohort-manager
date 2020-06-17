module.exports = ({ lectureTemplateNames, lectureNamesFor, stateForLecture, console }) =>  async (selectedCohort = null) => {
    const lectureNames = selectedCohort ? await lectureNamesFor(selectedCohort) : await lectureTemplateNames()
    const indexed = {}
    const modules = lectureNames.reduce((modules, lectureName) => {
        let { module = "Misc." } = selectedCohort ? stateForLecture(selectedCohort, lectureName) : stateForLecture(lectureName)
        indexed[module] = indexed[module] || []
        indexed[module].push(lectureName)
        if(!modules.includes(module)) modules.push(module)
        return modules
    }, [])
    const selectedModule = await console.prompt("Select a Module: ", modules)
    const selectedLecture = await console.prompt("Select a Lecture: ", indexed[selectedModule])
    return selectedLecture
}