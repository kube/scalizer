#! /usr/bin/env node

import * as command from 'commander'
import { writeFileSync } from 'fs'
import getYaml from './getYaml'
import { Scale, Skill } from './typings/Scale'
import { safeDump } from 'js-yaml'
import { set } from 'monolite'

command
  .option(
  '-o, --output <dir>',
  'save harmonized scale to a file'
  )
  .parse(process.argv)

const getSkillPoints =
  (scale: Scale, skill: Skill) =>
    scale.sections
      .map(section =>
        section.questions
          .map(question =>
            question.skills[skill] || 0
          )
          .reduce((a, b) => a + b)
      )
      .reduce((a, b) => a + b)

const updateSkillPoints =
  (scale: Scale, skill: Skill, coefficient: number): Scale =>
    set(scale, _ => _.sections)(sections =>
      sections.map(section =>
        set(section, _ => _.questions)(questions =>
          questions.map(question =>
            set(question, _ => _.skills[skill])(
              ((question.skills[skill] || 0) * coefficient) | 0
            )
          )
        )
      )
    )

const harmonizeScale = (scale: Scale) =>
  scale.skills.reduce((scale, skill) =>
    updateSkillPoints(scale, skill, 100 / getSkillPoints(scale, skill))
  , scale)

const scale = getYaml(command.args[0])
const harmonizedScale = safeDump(harmonizeScale(scale))

if (command.options.output)
  writeFileSync(command.options.output, harmonizedScale, { encoding: 'utf8' })
else
  console.log(harmonizedScale)
