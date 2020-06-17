#!/usr/bin/env node
const program = require('commander')
const commands = require('../commands')
const console = require('../console')
const lib = require('../lib')

for( let command in commands){
    program
        .command(command)
            .action( async (...args) => {
                await commands[command](...args)
                console.close()
            })
}
    
process.on('SIGINT', function() {
    // some other closing procedures go here
    process.exit(1);
  });

require('../lib/installation')(lib)
  .then( () => program.parse(process.argv))

