#! /usr/bin/env node

import * as commander from 'commander'
import { writeFileSync } from 'fs'
import { safeDump } from 'js-yaml'

import getYaml from './lib/getYaml'
import formatScale from './lib/format'

const command = commander as {
  output?: string
} & typeof commander

command
  .option(
  '-o, --output <dir>',
  'save formatted scale to a file'
  )
  .parse(process.argv)

// Format scale
const [scaleFile] = command.args
const scale = formatScale(getYaml(scaleFile))

// Convert scale to YAML string for output
const output = safeDump(scale)

// Output or save scale depending on options
if (command.output)
  writeFileSync(command.output, output, { encoding: 'utf8' })
else
  console.log(output)
