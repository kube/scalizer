#!/usr/bin/env node

const packageInfo = require('../package.json')
import * as program from 'commander'

program
  .version(packageInfo.version)
  .command('link <header> [sections...]', 'Link header and sections')
  .command('harmonize <file>', 'Harmonize points of sections')
  .command('format <file>', 'Format to 42 intra scale format')
  .parse(process.argv)
