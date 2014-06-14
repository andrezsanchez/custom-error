var test = require('tape')
var error = require('../')

test('inheritance', function(t) {
  t.plan(10)

  var MyError = error('MyError')

  t.ok(MyError() instanceof Error, 'MyError instances should inherit Error')
  t.ok(new MyError() instanceof Error, 'MyError instances should inherit Error')

  t.ok(MyError() instanceof MyError, 'MyError instances should inherit MyError')
  t.ok(new MyError() instanceof MyError, 'MyError instances should inherit MyError')


  var OtherError = error('OtherError', MyError)

  t.ok(OtherError() instanceof Error, 'OtherError instances should inherit Error')
  t.ok(new OtherError() instanceof Error, 'OtherError instances should inherit Error')

  t.ok(OtherError() instanceof MyError, 'OtherError instances should inherit MyError')
  t.ok(new OtherError() instanceof MyError, 'OtherError instances should inherit MyError')

  t.ok(OtherError() instanceof OtherError, 'OtherError instances should inherit OtherError')
  t.ok(new OtherError() instanceof OtherError, 'OtherError instances should inherit OtherError')
})

