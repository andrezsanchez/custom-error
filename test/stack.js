var test = require('tape')
var error = require('../')

if (supportsStack()) {
  test('stack', function(t) {
    t.plan(1)
    var MyError = error('MyError')

    t.equals(new MyError('meh').stack.substr(0, 12), 'MyError: meh', 'stack should contain name and message')
  })
}


function supportsStack() {
  var e = false
  try {
    throw new Error()
  }
  catch (err) {
    e = !!err.stack
  }
  return e
}
