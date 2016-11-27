#! /usr/bin/env node

import * as command from 'commander'
import { writeFileSync } from 'fs'
import getYaml from './getYaml'

import ScalizerScale from './typings/Scale'
import IntraScale from './typings/Scale'

const formatScale = (scale: ScalizerScale) =>
  42

command
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
  .parse(process.argv)
