const sample = require('./util/sample')
const linter = require('./behaviors/linter')
const cursor = require('./behaviors/cursor')

let path = null

module.exports = (notification) => {
  let now = new Date()

  console.log('*************************************')
  console.log(notification)

  if (notification.type === 'active') {
    path = notification.path
  }

  if (notification.type === 'change') {
    path = notification.path
    if (notification.change.match(/^\s*(var|let|const)/)) {
      global.furbies.sampleAction([
        "oooh, pick a good one!",
        "let's name baby",
        "ooh, name for kah? (sing) Oooh"
      ])
    }
    if (notification.change.match(/^\s*function/)) {
      global.furbies.sampleEmotion("collab")
    }

    if (notification.change.match(/^\s*s+\s*/)) {
      global.furbies.sampleAction([
        "mmm… s s s s"
      ])
    }

  }

  if (notification.type === 'cursor') {
    cursor.update(notification.path, notification.old, notification.new)
  }

  if (notification.type === 'open') {
    global.furbies.sampleEmotion('beginning')
  }

  if (notification.type === 'destroy') {
    global.furbies.sampleEmotion('goodbye')
  }

  if (notification.type === 'linter') {
    linter.update(path, notification.added.length, notification.removed.length)
  }
}







/*
  - Test failed
  - Test passed
  - Started variable
  - Started function
  - Finished function
  - In complex function
  - In a method that doesn't have test coverage
  - Added a linter error
  - Fixed a linter error
  - In duplicated code
  - CI build status
  - Naming conventions (NLP)
  - JSHint (if Javascript)
*/

/*


Sitting down
Small talk to get started
Starting a variable
Starting a function name
Things broken
Distracted, sleep, bored
Let's do this
Things fixed
Praise
Resolution
Commit
Build passes

 */
