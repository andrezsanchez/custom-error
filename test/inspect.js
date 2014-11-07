var test = require('tape')
var error = require('../')

test('inspect', function(t) {
  t.plan(2)

  var MyError = error('MyError')

  var blank = new MyError()
  
  t.equals(blank.inspect(), '[MyError]', 'errors should have a proper inspect value')

  var msg = new MyError('wat')
  t.equals(msg.inspect(), '[MyError: wat]', 'errors should have a proper inspect value')
})
