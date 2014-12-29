var test = require('tape')
var reformat = require('../lib/reformat')

test('reformat', function(t) {
  t.plan(1)

  var error = [
    'Error: bad stuff happened',
    '    at rad:1337:42',
    '    at hopesAndDreams:1:1'
  ].join('\n')

  var shouldEqual = [
    'OtherError: rad stuff happened',
    '    at rad:1337:42',
    '    at hopesAndDreams:1:1'
  ].join('\n')

  t.equal(
    reformat(error, 'OtherError', 'rad stuff happened'),
    shouldEqual,
    'should return true for v8 style Error stack traces'
  )
})
