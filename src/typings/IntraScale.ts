
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

// 42 Intra scale format

export type Skill = 'Adaptation & creativity'
  | 'Algorithms & AI'
  | 'Company experience'
  | 'DB & Data'
  | 'Functional programming'
  | 'Graphics'
  | 'Group & interpersonal'
  | 'Imperative programming'
  | 'Network & system administration'
  | 'Object-oriented programming'
  | 'Organization'
  | 'Parallel computing'
  | 'Rigor'
  | 'Security'
  | 'Technology integration'
  | 'Unix'
  | 'Web'

export type QuestionSkill = {
  percentage: number,
  name: string
}

export type Question = {
  name: string,
  position: number,
  guidelines: string,
  rating: 'bool' | 'multi',
  kind: 'standard' | 'bonus',
  questions_skills: QuestionSkill[]
}

export type Section = {
  name: string,
  position: number,
  description: string,
  questions: Question[]
}

export type Scale = {
  name: string,
  is_primary: boolean,
  lg: 'fr' | 'en' | 'ro',
  comment: string,
  introduction_md: string,
  disclaimer_md: string,
  guidelines_md: string,
  correction_number: number,
  duration: number,
  sections: Section[]
}

export default Scale
