const prompts = require('prompts')

module.exports = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    prompt: (question, options) => new Promise( async resolve => {
        let response;
        if(options){
            response = await prompts({
                type: 'select',
                name: 'value',
                message: question,
                choices: options.map( option => ({ title: option, value: option }))
            });
        } else {
            response = await prompts({
                name: 'value',
                type: 'text',
                message: question
            });
        }
        if(response.value === undefined)     process.exit(1);
        resolve(response.value)
    }),
    close: () => null
}