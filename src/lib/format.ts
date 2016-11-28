
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import ScalizerScale, {
  Section as ScalizerSection,
  Question as ScalizerQuestion
} from '../typings/ScalizerScale'

import IntraScale, {
  Section as IntraSection,
  Question as IntraQuestion,
  QuestionSkill
} from '../typings/IntraScale'

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
    guidelines: question.guidelines || '',
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
    introduction_md: scale.introduction || '',
    disclaimer_md: scale.disclaimer || '',
    guidelines_md: scale.guidelines || '',
    correction_number: scale.number_corrections || 3,
    duration: scale.duration || 2,
    sections: scale.sections.map(formatSection)
  })

export default formatScale
