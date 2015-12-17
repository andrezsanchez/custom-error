'use strict';

var v8StyleErrors = require('./lib/v8-style')()
var reformat = require('./lib/reformat')

// quick shim for Object.assign, thanks @WebReflection
// https://gist.github.com/WebReflection/10404826
if (!('assign' in Object)) {
  Object.assign = function(has){
    'use strict';
    return assign;
    function assign(target, source) {
      for (var i = 1; i < arguments.length; i++) {
        copy(target, arguments[i]);
      }
      return target;
    }
    function copy(target, source) {
      for (var key in source) {
        if (has.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
  }({}.hasOwnProperty);
}

/**
 *
 * @param name {string} Name of the error
 * @param ParentError {Error} Parent of this error
 * @param options {object} Any additional options. Add a properties key to set fixed props on the prototype. Add a params key to allow extra parameters to be defined.
 * @returns {NewError}
 * @constructor
 *
 * Example:
 *
 * var MyError = error('MyError', Error, {props: {code: '500'}, params: ['customProperty']})
 *
 * throw new MyError('custom property value', 'Message')
 *
 *
 */
function ErrorMaker(name, ParentError, options) {
  if (!options) options = {}

  function NewError() {

    // convert arguments to array. strictly not necessary but it's an old habit
    var args = [].slice.call(arguments)

    if (!(this instanceof NewError)) {
      return construct(NewError, args)
    }

    // set all custom defined parameters, then the message
    for (var i=0; i<this.params.length;i++) {
      this[this.params[i]] = args.shift()
    }
    var message = args.shift()

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

    // if we have v8-styled stack messages, then reformat
    if (v8StyleErrors) {
      if (this.stack) this.stack = reformat(this.stack, name, message)
    }

    this.message = message || ''
    this.name = name
  }

  NewError.prototype = new (ParentError || Error)()

  // set custom parameters into the prototype for processing at construction time
  if (options.params && options.params.constructor === Array) {
    NewError.prototype.params = options.params
  } else {
    NewError.prototype.params = []
  }

  // set custom properties (fixed)
  if (options.props) Object.assign(NewError.prototype,options.props)

  NewError.prototype.constructor = NewError
  NewError.prototype.inspect = function() {
    return this.message
      ? '[' + name + ': ' + this.message + ']'
      : '[' + name + ']'
  }
  NewError.prototype.name = name

  return NewError
}

function construct(constructor, args) {
  function F() {
    return constructor.apply(this, args);
  }
  F.prototype = constructor.prototype;
  return new F();
}



module.exports = ErrorMaker
