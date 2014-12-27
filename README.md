# custom-error

Create custom errors that inherit Error.

[![build status](https://secure.travis-ci.org/andrezsanchez/custom-error.png)](http://travis-ci.org/andrezsanchez/custom-error)

# why

Extending Error is a real [pain](http://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript), so this library deals with the quirks, providing a clean API to extend Error that works across JS environments, including Node and browsers.

# usage

Calling `customError(errorTitle[, ParentError])` creates a new error class that can be called the
same way that `Error` is called. The new error constructor will inherit from `Error`, or from
`ParentError` if you provide it.

# examples

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

## Using prototype

``` js
UnixApocalypseError.prototype.year = 2038

try {
  throw UnixApocalypseError()
}
catch (err) {
  console.log(err.year) // 2038
}
```


# installation

``` bash
npm install custom-error
```

# license

MIT
