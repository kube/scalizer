
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { join } from 'path'
import { readFileSync } from 'fs'
import { safeLoad } from 'js-yaml'

export default (filename: string) => {
  try {
    const obj = safeLoad(
      readFileSync(
        join(process.cwd(), filename),
        'utf8'
      )
    )
    return obj
  }
  catch (e) {
    console.error(`Error in ${filename}`)
    console.error(e.message)
    process.exit(42)
  }
}
