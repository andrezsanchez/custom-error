# custom-error

Create custom errors that inherit Error

[![build status](https://secure.travis-ci.org/AndreZSanchez/custom-error.png)](http://travis-ci.org/AndreZSanchez/custom-error)
[![browser support](https://ci.testling.com/AndreZSanchez/custom-error.png)](http://ci.testling.com/AndreZSanchez/custom-error)

# usage

`customError(errorTitle[, ParentError])`

# example

``` js
var customError = require('custom-error');

var ApocalypseError = customError('ApocalypseError');

ApocalypseError() instanceof Error           // true
ApocalypseError() instanceof ApocalypseError // true

var UnixApocalypseError = customError('MeteorApocalypseError', ApocalypseError)

UnixApocalypseError() instanceof Error                 // true
UnixApocalypseError() instanceof ApocalypseError       // true
UnixApocalypseError() instanceof UnixApocalypseError   // true

if (new Date().getFullYear() === 2038) {
  throw UnixApocalypseError('OH NOES')
}
```

# installation

``` bash
npm install custom-error
```

# license

MIT
