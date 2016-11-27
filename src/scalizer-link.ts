#! /usr/bin/env node

import * as command from 'commander'
import { writeFileSync } from 'fs'
import { safeDump } from 'js-yaml'
import getYaml from './getYaml'

const linkScale = (header: {}, sections: {}[]) =>
  // Create a new object with header info, and sections
  safeDump(
    Object.assign(
      {},
      header,
      { sections }
    )
  )

command
  .option(
  '-o, --output <dir>',
  'save built scale to a file'
  )
  .action((headerFile, sectionsFiles, options) => {
    console.log("WORLD")
    const header = getYaml(headerFile)
    const sections = sectionsFiles ? sectionsFiles.map(getYaml) : []
    const scale = linkScale(header, sections)

    if (options.output)
      writeFileSync(options.output, scale, { encoding: 'utf8' })
    else
      console.log(scale)
  })
