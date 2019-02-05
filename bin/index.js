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
    
program.parse(process.argv)