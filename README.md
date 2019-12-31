# alawmulaw
Copyright (c) 2018-2019 Rafael da Silva Rocha.  
https://github.com/rochars/alawmulaw

[![NPM version](https://img.shields.io/npm/v/alawmulaw.svg?style=for-the-badge)](https://www.npmjs.com/package/alawmulaw) [![Docs](https://img.shields.io/badge/docs-online-blue.svg?style=for-the-badge)](https://rochars.github.io/alawmulaw/index.html) [![Tests](https://img.shields.io/badge/tests-online-blue.svg?style=for-the-badge)](https://rawgit.com/rochars/alawmulaw/master/test/dist/browser.html)  
[![Codecov](https://img.shields.io/codecov/c/github/rochars/alawmulaw.svg?style=flat-square)](https://codecov.io/gh/rochars/alawmulaw) [![Unix Build](https://img.shields.io/travis/rochars/alawmulaw.svg?style=flat-square)](https://travis-ci.org/rochars/alawmulaw) [![Windows Build](https://img.shields.io/appveyor/ci/rochars/alawmulaw.svg?style=flat-square&logo=appveyor)](https://ci.appveyor.com/project/rochars/alawmulaw) [![Scrutinizer](https://img.shields.io/scrutinizer/g/rochars/alawmulaw.svg?style=flat-square&logo=scrutinizer)](https://scrutinizer-ci.com/g/rochars/alawmulaw/)

A-Law and mu-Law codecs in JavaScript.

## Install
```
npm install alawmulaw
```

## Use

### Browser
Use the **alawmulaw.js** file in the */dist* folder:
```html
<script src="alawmulaw.js"></script>
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

### Node
Require from 'alawmulaw'
```javascript
const alawmulaw = require('alawmulaw');

// Encode all the samples in a file
// Only 16-bit samples are supported
let aLawSamples = alawmulaw.alaw.encode(pcmSamples);
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

## References
https://github.com/torvalds/linux/blob/master/sound/core/oss/mulaw.c  
https://github.com/deftio/companders  
http://dystopiancode.blogspot.com.br/2012/02/pcm-law-and-u-law-companding-algorithms.html

### LICENSE
Copyright (c) 2018-2019 Rafael da Silva Rocha.

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
