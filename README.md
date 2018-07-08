# alawmulaw
Copyright (c) 2018 Rafael da Silva Rocha.  
https://github.com/rochars/alawmulaw

[![NPM version](https://img.shields.io/npm/v/alawmulaw.svg?style=for-the-badge)](https://www.npmjs.com/package/alawmulaw) [![Docs](https://img.shields.io/badge/docs-online-blue.svg?style=for-the-badge)](https://rochars.github.io/alawmulaw/index.html) [![Tests](https://img.shields.io/badge/tests-online-blue.svg?style=for-the-badge)](https://rawgit.com/rochars/alawmulaw/master/test/browser.html)  
[![Codecov](https://img.shields.io/codecov/c/github/rochars/alawmulaw.svg?style=flat-square)](https://codecov.io/gh/rochars/alawmulaw) [![Unix Build](https://img.shields.io/travis/rochars/alawmulaw.svg?style=flat-square)](https://travis-ci.org/rochars/alawmulaw) [![Windows Build](https://img.shields.io/appveyor/ci/rochars/alawmulaw.svg?style=flat-square&logo=appveyor)](https://ci.appveyor.com/project/rochars/alawmulaw) [![Scrutinizer](https://img.shields.io/scrutinizer/g/rochars/alawmulaw.svg?style=flat-square&logo=scrutinizer)](https://scrutinizer-ci.com/g/rochars/alawmulaw/)

A-Law and mu-Law codecs in JavaScript.

## Install
```
npm install alawmulaw
```

## Use

### Node
Require from 'alawmulaw'
```javascript
const alawmulaw = require('alawmulaw');

// Encode all the samples in a file
// Only 16-bit samples are supported
let aLawSamples = alawmulaw.alaw.encode(pcmSamples);
```

### ES module
Import from **alawmulaw.js**:
```javascript
import * as alawmulaw from './dist/alawmulaw.js';
let aLawSamples = alawmulaw.alaw.encode(pcmSamples);
```

### Browser
Use the compiled file in the */dist* folder:
```html
<script src="./dist/alawmulaw.min.js"></script>
<script>
    // A-Law
    samples = alawmulaw.alaw.encode(samples);
    samples = alawmulaw.alaw.decode(samples);
    sample = alawmulaw.alaw.encodeSample(sample);
    sample = alawmulaw.alaw.decodeSample(sample);

    // mu-Law
    samples = alawmulaw.mulaw.encode(samples);
    samples = alawmulaw.mulaw.decode(samples);
    sample = alawmulaw.mulaw.encodeSample(sample);
    sample = alawmulaw.mulaw.decodeSample(sample);
</script>
```

Or get it from the [jsDelivr](https://www.jsdelivr.com) CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/alawmulaw"></script>
```

Or get it from [unpkg](https://www.unpkg.com):
```html
<script src="https://unpkg.com/alawmulaw"></script>
```

Or as a ES6 module in modern browsers from [jspm](https://jspm.io):
```html
<script type="module">
  import * as alawmulaw from 'https://dev.jspm.io/alawmulaw';
  // ...
</script>
```

## API

### alawmulaw.alaw
```javascript

/**
 * Encode a 16-bit linear PCM sample as 8-bit A-Law.
 * @param {number} sample A 16-bit PCM sample
 * @return {number}
 */
export function encodeSample(sample) {}

/**
 * Decode a 8-bit A-Law sample as 16-bit PCM.
 * @param {number} aLawSample The 8-bit A-Law sample
 * @return {number}
 */
export function decodeSample(aLawSample) {}

/**
 * Encode 16-bit linear PCM samples as 8-bit A-Law samples.
 * @param {!Int16Array} samples A array of 16-bit PCM samples.
 * @return {!Uint8Array}
 */
export function encode(samples) {}

/**
 * Decode 8-bit A-Law samples into 16-bit linear PCM samples.
 * @param {!Uint8Array} samples A array of 8-bit A-Law samples.
 * @return {!Int16Array}
 */
export function decode(samples) {}
```

### alawmulaw.mulaw
```javascript
/**
 * Encode a 16-bit linear PCM sample as 8-bit mu-Law.
 * @param {number} sample A 16-bit PCM sample
 * @return {number}
 */
export function encodeSample(sample) {}

/**
 * Decode a 8-bit mu-Law sample as 16-bit PCM.
 * @param {number} muLawSample The 8-bit mu-Law sample
 * @return {number}
 */
export function decodeSample(muLawSample) {}

/**
 * Encode 16-bit linear PCM samples into 8-bit mu-Law samples.
 * @param {!Int16Array} samples A array of 16-bit PCM samples.
 * @return {!Uint8Array}
 */
export function encode(samples) {}

/**
 * Decode 8-bit mu-Law samples into 16-bit PCM samples.
 * @param {!Uint8Array} samples A array of 8-bit mu-Law samples.
 * @return {!Int16Array}
 */
export function decode(samples) {}
```

## Distribution
This library is a ES module also distributed as a CommonJS module, UMD module and a compiled script for browsers. It works out of the box in Node when installed with ```npm install alawmulaw```. It includes a TypeScript definition file.

If you use the [Closure Compiler](https://github.com/google/closure-compiler), this package includes a externs file: **./externs.js**.

### If you are using this lib in a browser:

You may load both **./dist/alawmulaw.umd.js** and **./dist/alawmulaw.min.js** in the browser with ```<script>``` tags. Ideally you should use **alawmulaw.min.js**. You can load it via the https://unpkg.com and https://www.jsdelivr.com/ CDNs:

[unpkg](https://unpkg.com/alawmulaw):
```html
<script src="https://unpkg.com/alawmulaw"></script>
```

[jsDelivr](https://cdn.jsdelivr.net/npm/alawmulaw):
```html
<script src="https://cdn.jsdelivr.net/npm/alawmulaw"></script>
```

### If you are using this lib as a dependency:

- The **CommonJS** dist is **./dist/alawmulaw.cjs.js**. It is the dist file used by Node. It is served in the "main" field of package.json and is the source you are running when you **npm install alawmulaw**. It is not compiled or minified.

- The **UMD** module is **./dist/alawmulaw.umd.js**. It is transpiled to ES5 and compatible with Node, AMD and browsers. It is served in the "browser" field of package.json.

- The **browser-only** dist is **./dist/alawmulaw.min.js**. It is transpiled to ES5 and compiled. It is used in the "unpkg" and "jsdelivr" fields of package.json.

- The **ES6 dist** is **./dist/alawmulaw.js**, served as "es2015" in package.json. It is not compiled/minified.

- **./main.js** is served as "module" in package.json. This should be the entry point for bundlers.

If your module bundler is using "browser" as the entry point **your dist should work the same** but will be a larger file.

## References
https://github.com/torvalds/linux/blob/master/sound/core/oss/mulaw.c  
https://github.com/deftio/companders  
http://dystopiancode.blogspot.com.br/2012/02/pcm-law-and-u-law-companding-algorithms.html

### LICENSE
Copyright (c) 2018 Rafael da Silva Rocha.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
