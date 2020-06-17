const path = require('path')
const fs = require('fs')
let ejs = require('ejs')
    
module.exports = ({ console, state, exec, openCohort, lectureNamesFor, stateForLecture, config, inflection }) =>  async () => {
    const { FILES_PATH } = config 
    const { activeCohort } = state
    let homeTemplatePath = path.join(FILES_PATH, activeCohort.name, "homeTemplate.ejs")
    let homeTemplate = fs.readFileSync(homeTemplatePath).toString()
    let lectureNames = await lectureNamesFor(activeCohort.name)
    let lectures = lectureNames.map( name => ({ 
        name: inflection.toTitleCase(name.split('-').slice(1).join(' ')), 
        ...stateForLecture(activeCohort.name,name), 
        codeURL: `https://github.com/learn-co-students/${activeCohort.name}/tree/master/${name}`
    }))
    let modules = [ 'Module 1', 'Module 2', 'Module 3', 'Module 4', 'Node JS' ].map( name => ({
        name,
        lectures: [],
        description: `[Learning Goals and Rubric](http://github.com/Joshua-Miles/My-Lectures/blob/master/${encodeURIComponent(name.toUpperCase())}.md)`
    }))
    lectures.forEach( lecture => {
        let module = modules.find(module => lecture.module === module.name)
        if(!module) {
            module = { name: lecture.module, lectures: [] }
            modules.push(module)
        }
        module.lectures.push(lecture)
    })
    let md = ejs.render(homeTemplate, { modules });
    let homePagePath = path.join(FILES_PATH, activeCohort.name, "Home-Page", "README.md")
    await fs.writeFileSync(homePagePath, md)
    await exec(`
        ${openCohort()}
        cd "Home-Page"
        git add .
        git commit -m "-"
        git push
    `)
}