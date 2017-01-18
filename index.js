'use strict';

var v8StyleErrors = require('./lib/v8-style')()
var reformat = require('./lib/reformat')

function defaultInspect() {
  return this.message
    ? '[' + this.name + ': ' + this.message + ']'
    : '[' + this.name + ']'
}

function reformatStack() {
  // if we have v8-styled stack messages and this.stack is defined, then reformat
  if (v8StyleErrors && this.stack) {
    this.stack = reformat(this.stack, this.name, this.message)
  }
}

function ErrorMaker(name, ParentError) {
  function NewError(message) {
    if (!(this instanceof NewError))
      return new NewError(message)

    // Use a try/catch block to capture the stack trace. Capturing the stack trace here is
    // necessary, otherwise we will get the stack trace at the time the new error class was created,
    // rather than when it is instantiated.  We add `message` and `name` so that the stack trace
    // string will match our current error class.
    try {
      throw new Error(message)
    }
    catch (err) {
      err.name = name
      this.stack = err.stack
    }

    this.message = message || ''
    this.name = name

    this.reformatStack();
  }

  NewError.prototype = new (ParentError || Error)()
  NewError.prototype.constructor = NewError
  NewError.prototype.inspect = defaultInspect;
  NewError.prototype.name = name
  NewError.prototype.reformatStack = reformatStack;

  return NewError
}

module.exports = ErrorMaker
