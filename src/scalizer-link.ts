#! /usr/bin/env node

import * as commander from 'commander'
import { writeFileSync, watchFile } from 'fs'
import { safeDump } from 'js-yaml'

import getYaml from './lib/getYaml'
import linkScale from './lib/link'
import harmonizeScale from './lib/harmonize'
import formatScale from './lib/format'

const command = commander as {
  output?: string
  harmonize?: boolean
  format?: boolean
  watch?: boolean
} & typeof commander

command
  .option(
  '-o, --output <dir>',
  'save built scale to a file'
  )
  .option(
  '-h, --harmonize',
  'harmonize scale points'
  )
  .option(
  '-f, --format',
  'format scale for 42 intra'
  )
  .option(
  '-w, --watch',
  'watch files and update on change'
  )
  .parse(process.argv)

const [headerFiles, ...sectionsFiles] = command.args.slice(0, -1)

function task () {
  const header = getYaml(headerFiles)
  const sections = sectionsFiles ? sectionsFiles.map(getYaml) : []

  // Link scale and apply desired transformations
  let scale: any = linkScale(header, sections)
  scale = command.harmonize ? harmonizeScale(scale) : scale
  scale = command.format ? formatScale(scale) : scale

  // Convert scale to YAML string for output
  const output = safeDump(scale)

  // Output or save scale depending on options
  if (command.output)
    writeFileSync(command.output, output, { encoding: 'utf8' })
  else
    console.log(output)
}

// Watch change events if requested
if (command.watch)
  [headerFiles, ...sectionsFiles].forEach(file =>
    watchFile(file, task)
  )

task()
