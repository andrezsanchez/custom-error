function ErrorMaker(name, ParentError) {
  var NewError = function NewError(message) {
    if (!(this instanceof NewError))
      return new NewError(message)

    // get stack
    var err = new Error(message)
    err.name = name
    this.stack = err.stack

    this.message = message || ''
    this.name = name
  }

  ParentError = ParentError || Error
  NewError.prototype = new ParentError()
  NewError.prototype.name = name

  return NewError
}

module.exports = ErrorMaker
