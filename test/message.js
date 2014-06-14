var test = require('tape')
var error = require('../')

test('message', function(t) {
  t.plan(2)
  var MyError = error('MyError')
  t.equals(MyError().name, 'MyError', 'name should be correct')
  t.equals(MyError('rawr').message, 'rawr', 'message should be correct')
})
