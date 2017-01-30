'use strict';

var v8StyleErrors = require('./lib/v8-style')()
var reformat = require('./lib/reformat')

function defaultInspect() {
  return this.message
    ? '[' + this.name + ': ' + this.message + ']'
    : '[' + this.name + ']'
}

function defaultToJson() {
  let res = {};
  let err = this;
  Object.getOwnPropertyNames(err).forEach(function(key) {
    res[key] = err[key];
  });
  return res;
}

function reformatStack() {
  // if we have v8-styled stack messages and this.stack is defined, then reformat
  if (v8StyleErrors && this.stack) {
    this.stack = reformat(this.stack, this.name, this.message)
  }
  if (this.stack) {
    // when created from child error stack contains all the parents
    // perform some stack cleanup
    this.stack = this.stack.replace(/^.+?NewError(((?!=NewError).+)[\r\n])/gm, '')
  }
}

function BaseErrorConstructor (message) {
    // Use a try/catch block to capture the stack trace. Capturing the stack trace here is
    // necessary, otherwise we will get the stack trace at the time the new error class was created,
    // rather than when it is instantiated.  We add `message` and `name` so that the stack trace
    // string will match our current error class.
    try {
      throw new Error(message)
    }
    catch (err) {
      err.name = this.name
      this.stack = err.stack
    }
    this.message = message || ''

    this.reformatStack();
}

function ErrorMaker(name, ParentError, ctr) {
  function NewError(error, message) {
    if (!(this instanceof NewError)) {
      return new NewError(error, message)
    }

    var args = Array.prototype.slice.call(arguments);

    // hard processing of nested error
    if (error instanceof Error) {
      this.nested = error;
      // Error does not provide error serializer and this makes error logging useless
      if (!(error.toJSON)) {
        // provide custom serialization
        Object.defineProperty(error, 'toJSON', {
            value: defaultToJson,
            configurable: true,
            writable: true
        });
      }
      // do not pass error down the parent hierarchy
      // it will be available as property for other constructors
      args.shift();
    }

    if (ParentError) {
      // invoke parent constructors before the current one
      ParentError.apply(this, args);
    }
    if (ctr) {
      // final invocation
      ctr.apply(this, args);
    }
  }

  // add better looking stack name, instead of 'NewError'
  Object.defineProperty(NewError, "name", {value: name});

  NewError.prototype = new (ParentError || Error)();
  NewError.prototype.constructor = NewError;
  NewError.prototype.inspect = defaultInspect;
  NewError.prototype.name = name;
  NewError.prototype.reformatStack = reformatStack;
  NewError.prototype.toJSON = defaultToJson;

  if (!ctr) {
      if (!ParentError) {
          ctr = BaseErrorConstructor;
      }
  }

  return NewError
}

module.exports = ErrorMaker
