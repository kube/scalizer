#! /usr/bin/env node

import * as command from 'commander'
import { writeFileSync } from 'fs'
import getYaml from './getYaml'
import { Scale } from './typings/Scale'

const getTotalPoints = (scale: Scale) => {

}

const harmonizeScale = (scale: {}) => {

}

command
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
  .parse(process.argv)
