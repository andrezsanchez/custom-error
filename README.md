# custom-error

Create custom errors that inherit Error

[![browser support](https://ci.testling.com/andrezsanchez/custom-error.png)](http://ci.testling.com/andrezsanchez/custom-error)

[![build status](https://secure.travis-ci.org/andrezsanchez/custom-error.png)](http://travis-ci.org/andrezsanchez/custom-error)

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
