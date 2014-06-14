var test = require('tape')
var error = require('../')

test('new', function(t) {
  t.plan(2)
  var MyError = error('MyError')
  t.ok(new MyError() instanceof MyError, 'new MyError() should create an instance of MyError')
  t.ok(MyError() instanceof MyError, 'MyError() should create an instance of MyError')
})
