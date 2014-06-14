var test = require('tape')
var error = require('../')

test('throw', function(t) {
  t.plan(2)

  var MyError = error('MyError')

  var f
  f = function() {
    throw MyError()
  }
  t.throws(f, MyError, 'Should throw MyError')

  f = function() {
    throw new MyError()
  }
  t.throws(f, MyError, 'Should throw MyError')
})

