
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { Scale, Section, Skill } from '../typings/ScalizerScale'
import { grey, green, bgGreen } from 'colors'

const getSectionSkillPoints =
  (section: Section, skill: Skill) =>
    section.questions
      .map(question =>
        question.skills[skill] || 0
      )
      .reduce((a, b) => a + b)

const getSkillPoints =
  (scale: Scale, skill: Skill) =>
    scale.sections
      .map(section =>
        getSectionSkillPoints(section, skill)
      )
      .reduce((a, b) => a + b)

const displaySkillStats =
  (scale: Scale, skill: Skill) => {
    console.log(`\n${skill}:`)

    scale.sections
      .reduce((acc, section) => {
        const current = {
          cumulated: acc.cumulated + getSectionSkillPoints(section, skill),
          total: acc.total
        }

        // Display bar graphics for each section
        const barLength = current.cumulated * 100 / current.total | 0
        console.log(
          bgGreen(green('*'.repeat(barLength)))
            .concat(grey('-'.repeat(100 - barLength)))
            .concat(` ${section.name}`)
        )
        return current
      },
      {
        cumulated: 0,
        total: getSkillPoints(scale, skill)
      })
  }

const displayStats =
  (scale: Scale) =>
    scale.skills.forEach(skill =>
      displaySkillStats(scale, skill)
    )

export default displayStats
