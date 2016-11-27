
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { set } from 'monolite'
import { Scale, Skill } from '../typings/ScalizerScale'

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

export default (scale: Scale) =>
  scale.skills.reduce((scale, skill) =>
    updateSkillPoints(scale, skill, 100 / getSkillPoints(scale, skill))
    , scale)
