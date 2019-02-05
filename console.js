const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

module.exports = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    prompt: (question, options) => new Promise( resolve => {
        if(options){
            var List = require('prompt-list');
            var list = new List({
                message: question,
                choices: options
            });
            
            // async
            list.ask(function(answer) {
                resolve(answer);
            });
        } else {
            rl.question(question, (answer) => {
                resolve(answer)
            })
        }
    }),
    close: () => rl.close()
}