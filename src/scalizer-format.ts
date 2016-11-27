#! /usr/bin/env node

import * as command from 'commander'
import { writeFileSync } from 'fs'
import getYaml from './getYaml'

import ScalizerScale, {
  Section as ScalizerSection,
  Question as ScalizerQuestion
} from './typings/Scale'

import IntraScale, {
  Section as IntraSection,
  Question as IntraQuestion,
  QuestionSkill
} from './typings/42Scale'


const formatQuestionSkills =
  (skills: { [skill: string]: number }): QuestionSkill[] =>
    Object.keys(skills).map(skillName => ({
      percentage: skills[skillName],
      name: skillName
    }))

const formatQuestion =
  (question: ScalizerQuestion, index: number): IntraQuestion => ({
    name: question.name,
    position: index + 1,
    guidelines: question.guidelines,
    rating: question.rating || 'bool',
    kind: question.bonus ? 'bonus' : 'standard',
    questions_skills: formatQuestionSkills(question.skills)
  })

const formatSection =
  (section: ScalizerSection, index: number): IntraSection => ({
    name: section.name,
    position: index + 1,
    description: section.description || '',
    questions: section.questions.map(formatQuestion)
  })

const formatScale =
  (scale: ScalizerScale): IntraScale => ({
    name: scale.name,
    is_primary: true,
    lg: scale.lang,
    comment: '',
    introduction_md: scale.introduction,
    disclaimer_md: scale.disclaimer,
    guidelines_md: scale.guidelines,
    correction_number: scale.number_corrections,
    duration: scale.duration,
    sections: scale.sections.map(formatSection)
  })

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
