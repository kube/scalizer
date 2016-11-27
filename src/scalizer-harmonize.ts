#! /usr/bin/env node

import * as commander from 'commander'
import { writeFileSync } from 'fs'
import { safeDump } from 'js-yaml'

import getYaml from './lib/getYaml'
import harmonizeScale from './lib/harmonize'
import formatScale from './lib/format'

const command = commander as {
  output?: string
  format?: boolean
} & typeof commander

command
  .option(
  '-o, --output <dir>',
  'save scale to a file'
  )
  .option(
  '-f, --format',
  'format scale for 42 intra'
  )
  .parse(process.argv)

// Harmonize scale and format if desired
const [scaleFile] = command.args
let scale: any = harmonizeScale(getYaml(scaleFile))
scale = command.format ? formatScale(scale) : scale

// Convert scale to YAML string for output
const output = safeDump(scale)

// Output or save scale depending on options
if (command.output)
  writeFileSync(command.output, output, { encoding: 'utf8' })
else
  console.log(output)
