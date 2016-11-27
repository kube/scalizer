
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { safeDump } from 'js-yaml'

export default (header: {}, sections: {}[]) =>
  // Create a new object with header info, and sections
  safeDump(
    Object.assign(
      {},
      header,
      { sections }
    )
  )
