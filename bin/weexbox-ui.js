#! /usr/bin/env node

const program = require('commander')

program
  .command('build')
  .description('构建')
  .action(() => {
    require('../build.js')
  })

program.parse(process.argv)
