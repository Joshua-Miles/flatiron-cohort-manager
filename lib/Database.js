const fs = require('fs')
module.exports = function(path){
    let exists = fs.existsSync(path)
    if(!exists) fs.appendFileSync(path, JSON.stringify({
        cohorts: [],
        activeCohort: null,
        'code-editor': 'Visual Studio Code',
        'markdown-editor': 'Typora'
    }))
    
    const data = JSON.parse(fs.readFileSync(path))

    const save = () => fs.writeFileSync(path, JSON.stringify(data))

    let observed = obj => new Proxy(obj, {
        get: function(obj, prop){
            let result = obj[prop]
            if(typeof result === 'function') result = result.bind(obj)
            if(typeof result === 'object') result = observed(result)
            return result
        },
        set: function(obj, prop, value){
            obj[prop] = value
            save()
        }
    })

    return observed(data)
}