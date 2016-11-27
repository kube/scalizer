
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

// 42scalizer scale format

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

export type Question = {
  name: string
  guidelines: string
  bonus?: true
  rating?: 'bool' | 'multi'
  skills: { [skill: string]: number }
}

export type Section = {
  name: string
  description?: string
  questions: Question[]
}

export type Scale = {
  name: string
  lang: 'fr' | 'en' | 'ro'
  skills: Skill[],
  introduction: string
  disclaimer?: string
  guidelines: string
  number_corrections: number
  duration: number
  sections: Section[]
}

export default Scale
