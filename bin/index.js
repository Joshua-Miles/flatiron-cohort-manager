#!/usr/bin/env node
const program = require('commander')
const commands = require('../commands')
const console = require('../console')

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

program.parse(process.argv)