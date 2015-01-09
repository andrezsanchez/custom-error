# custom-error

Create custom errors that inherit Error.

[![build status](https://secure.travis-ci.org/andrezsanchez/custom-error.png)](http://travis-ci.org/andrezsanchez/custom-error)

## why

Extending Error is a real [pain](http://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript). This library deals with the quirks, providing a clean API to extend Error that works across JS environments, including Node and browsers.

## api

### customError(name, [ParentError])

Returns a new subclass of Error, or of ParentError if it is provided.

#### name

*Required*  
Type: `string`

The display name of this class's errors. For example, the builtin TypeError class's name is `"TypeError"`. This affects how the error is displayed when it is thrown.

#### ParentError

Type: `Error`, `Error` descendant  
Default: `Error`

The Error type to be subclassed.

## examples

``` js
var customError = require('custom-error');

var ApocalypseError = customError('ApocalypseError');

ApocalypseError() instanceof Error           // true
ApocalypseError() instanceof ApocalypseError // true

var UnixApocalypseError = customError('UnixApocalypseError', ApocalypseError)

UnixApocalypseError() instanceof Error                 // true
UnixApocalypseError() instanceof ApocalypseError       // true
UnixApocalypseError() instanceof UnixApocalypseError   // true

if (new Date().getFullYear() === 2038) {
  throw UnixApocalypseError('OH NOES')
}
```

### using prototype

``` js
UnixApocalypseError.prototype.year = 2038

try {
  throw UnixApocalypseError()
}
catch (err) {
  console.log(err.year) // 2038
}
```


## installation

``` bash
npm install custom-error
```

## license

MIT
