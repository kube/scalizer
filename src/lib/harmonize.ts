
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { set, setMap } from 'monolite'
import { Scale, Skill } from '../typings/ScalizerScale'

const getSkillPoints =
  (scale: Scale, skill: Skill) =>
    scale.sections.map(section =>
      section.questions.map(question =>
        question.skills[skill] || 0
      ).reduce((a, b) => a + b)
    ).reduce((a, b) => a + b)

const updateSkillPoints =
  (scale: Scale, skill: Skill, coefficient: number): Scale =>
    setMap(scale, _ => _.sections)(section =>
        setMap(section, _ => _.questions)(question =>
            set(question, _ => _.skills[skill])(
              ((question.skills[skill] || 0) * coefficient) | 0
            )
          )
        )

export default (scale: Scale) =>
  scale.skills.reduce((scale, skill) =>
    updateSkillPoints(scale, skill, 100 / getSkillPoints(scale, skill))
    , scale)
