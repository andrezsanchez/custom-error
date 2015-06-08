'use strict';

var test = require('tape')
var error = require('../')

test('catch', function(t) {
  t.plan(2)

  var MyError = error('MyError')

  try {
    throw MyError('faffy')
  }
  catch (err) {
    t.equals(err.name, 'MyError', 'should set error name correctly')
    t.equals(err.message, 'faffy', 'should set error message correctly')
  }
})
