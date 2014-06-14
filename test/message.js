var test = require('tape')
var error = require('../')

test('message', function(t) {
  t.plan(3)
  var MyError = error('MyError')
  t.equals(MyError().name, 'MyError', 'name should be correct')
  t.equals(MyError('rawr').message, 'rawr', 'message should be correct')

  try {
    throw new MyError('meh')
  }
  catch (err) {
    t.equals(err.toString(), 'MyError: meh', 'stack should contain name and message')
  }
})
