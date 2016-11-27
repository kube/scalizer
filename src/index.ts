#!/usr/bin/env node

const packageInfo = require('../package.json')

import { writeFileSync } from 'fs'
import * as program from 'commander'

import getYaml from './getYaml'
import linkScale from './linkScale'
import harmonizeScale from './harmonizeScale'
import formatScale from './formatScale'


program
  .version(packageInfo.version)


program
  .command(
  'link <header> [sections...]',
  'Link header and sections to scale'
  )
  .option(
  '-o, --output <dir>',
  'save built scale to a file'
  )
  .action((headerFile, sectionsFiles, options) => {
    const header = getYaml(headerFile)
    const sections = sectionsFiles ? sectionsFiles.map(getYaml) : []
    const scale = linkScale(header, sections)

    if (options.output)
      writeFileSync(options.output, scale, { encoding: 'utf8' })
    else
      console.log(scale)
  })


program
  .command(
  'harmonize <file>',
  'Harmonize scale correction points'
  )
  .option(
  '-o, --output <dir>',
  'save harmonized scale to a file'
  )
  .action((scaleFile, options) => {
    const scale = getYaml(scaleFile)
    const harmonizedScale = harmonizeScale(scale)

    if (options.output)
      writeFileSync(options.output, harmonizedScale, { encoding: 'utf8' })
    else
      console.log(scale)
  })


program
  .command(
  'format <file>',
  'Format scale for 42 intra'
  )
  .option(
  '-o, --output <dir>',
  'save formatted scale to a file'
  )
  .action((scaleFile, options) => {
    const scale = getYaml(scaleFile)
    const formattedScale = formatScale(scale)

    if (options.output)
      writeFileSync(options.output, formattedScale, { encoding: 'utf8' })
    else
      console.log(scale)
  })


program
  .parse(process.argv)
