# alawmulaw
Copyright (c) 2018 Rafael da Silva Rocha.  
https://github.com/rochars/alawmulaw

[![NPM version](https://img.shields.io/npm/v/alawmulaw.svg?style=for-the-badge)](https://www.npmjs.com/package/alawmulaw) [![Docs](https://img.shields.io/badge/docs-online-blue.svg?style=for-the-badge)](https://rochars.github.io/alawmulaw/index.html)  
[![Codecov](https://img.shields.io/codecov/c/github/rochars/alawmulaw.svg?style=flat-square)](https://codecov.io/gh/rochars/alawmulaw) [![Unix Build](https://img.shields.io/travis/rochars/alawmulaw.svg?style=flat-square)](https://travis-ci.org/rochars/alawmulaw) [![Windows Build](https://img.shields.io/appveyor/ci/rochars/alawmulaw.svg?style=flat-square&logo=appveyor)](https://ci.appveyor.com/project/rochars/alawmulaw) [![Scrutinizer](https://img.shields.io/scrutinizer/g/rochars/alawmulaw.svg?style=flat-square&logo=scrutinizer)](https://scrutinizer-ci.com/g/rochars/alawmulaw/)

## About
A-Law and μ-Law codecs for Node.js and the browser.

## Install
```
npm install alawmulaw
```

## Browser
Use the compiled file in the */dist* folder:
```html
<script src="alawmulaw-min.js"></script>
```

Or get it from the [jsDelivr](https://www.jsdelivr.com) CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/alawmulaw@2.0.6"></script>
```

## A-Law
Full files:
```javascript

const alaw = require("alawmulaw").alaw;

// Encode all the samples in a file
// Only 16-bit samples are supported
aLawSamples = alaw.encode(pcmSamples);

// Decompressing all the samples in a file
pcmSamples = alaw.decode(aLawSamples);
```

Sample by sample:
```javascript

const alaw = require("alawmulaw").alaw;

// Encoding
aLawSample = alaw.encodeSample(pcmSample);

// Decoding
pcmSample = alaw.decodeSample(aLawSample);
```

## mu-Law
Full files:
```javascript

const mulaw = require("alawmulaw").mulaw;

// Encode all the samples in a file
// Only 16-bit samples are supported
muLawSamples = mulaw.encode(pcmSamples);

// Decode all the samples in a file
pcmSamples = mulaw.decode(muLawSamples);
```

Sample by sample:
```javascript

const mulaw = require("alawmulaw").mulaw;

// Encoding
muLawSample = mulaw.encodeSample(pcmSample);

// Decoding
pcmSample = mulaw.decodeSample(muLawSample);
```

## In the browser
```html
<script src="dist/alawmulaw-min.js"></script>
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

## References
https://github.com/torvalds/linux/blob/master/sound/core/oss/mulaw.c  
https://github.com/deftio/companders  
http://dystopiancode.blogspot.com.br/2012/02/pcm-law-and-u-law-companding-algorithms.html

## LICENSE
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
