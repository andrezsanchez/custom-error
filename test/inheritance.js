var test = require('tape')
var error = require('../')

test('inheritance', function(t) {
  t.plan(7)

  var MyError = error('MyError')
  MyError.prototype.code = 77

  t.ok(MyError() instanceof Error, 'MyError instances should inherit Error')
  t.ok(MyError() instanceof MyError, 'MyError instances should inherit MyError')
  t.equals(MyError().code, 77, 'MyError instances should inherit MyError.prototype properties')


  var OtherError = error('OtherError', MyError)

  t.ok(OtherError() instanceof Error, 'OtherError instances should inherit Error')
  t.ok(OtherError() instanceof MyError, 'OtherError instances should inherit MyError')
  t.ok(OtherError() instanceof OtherError, 'OtherError instances should inherit OtherError')

  t.equals(OtherError().code, 77, 'OtherError instances should inherit MyError.prototype properties')
})

