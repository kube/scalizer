
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import Scale, { Section } from '../typings/ScalizerScale'

export default (header: Scale, sections: Section[]): Scale =>
  // Create a new object with header info, and sections
  Object.assign(
    {},
    header,
    { sections }
  )
