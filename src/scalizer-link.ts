#! /usr/bin/env node

import * as command from 'commander'
import { writeFileSync } from 'fs'
import { safeDump } from 'js-yaml'
import getYaml from './getYaml'

command
  .option(
  '-o, --output <dir>',
  'save built scale to a file'
  )
  .parse(process.argv)

const linkScale = (header: {}, sections: {}[]) =>
  // Create a new object with header info, and sections
  safeDump(
    Object.assign(
      {},
      header,
      { sections }
    )
  )

const [headerFiles, ...sectionsFiles] = command.args.slice(0, -1)

const header = getYaml(headerFiles)
const sections = sectionsFiles ? sectionsFiles.map(getYaml) : []
const scale = linkScale(header, sections)

if (command.output)
  writeFileSync(command.output, scale, { encoding: 'utf8' })
else
  console.log(scale)
