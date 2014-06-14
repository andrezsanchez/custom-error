var test = require('tape')
var error = require('../')

test('catch', function(t) {
  t.plan(1)

  var MyError = error('MyError')

  var f
  f = function() {
    try {
      throw MyError()
    }
    catch (err) {}
  }
  t.doesNotThrow(f, MyError, 'Should catch MyError')
})


