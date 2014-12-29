var test = require('tape')
var rewire = require('rewire')

test('v8-style errors', function(t) {
  var v8StyleErrors
  t.plan(2)

  var FakeV8Error = function(msg) {
    this.stack = 'Error: ' + msg +'\n'
  }
  v8StyleErrors = rewire('../lib/v8-style')
  v8StyleErrors.__set__('Error', FakeV8Error)

  t.true(v8StyleErrors(), 'should return true for v8 style Error stack traces')

  var FakeFirefoxError = function(msg) {
    this.stack = 'func@http://localhost:8081/index.js:2:11\n'
  }

  v8StyleErrors = rewire('../lib/v8-style')
  v8StyleErrors.__set__('Error', FakeFirefoxError)

  t.false(v8StyleErrors(), 'should return false for other styles of Error stack traces')
})
