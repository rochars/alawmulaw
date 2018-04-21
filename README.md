# alawmulaw
JavaScript A-Law and mu-Law codecs.  
Copyright (c) 2018 Rafael da Silva Rocha.  
https://github.com/rochars/alawmulaw

References:  
https://github.com/torvalds/linux/blob/master/sound/core/oss/mulaw.c  
https://github.com/deftio/companders  
http://dystopiancode.blogspot.com.br/2012/02/pcm-law-and-u-law-companding-algorithms.html

[![NPM version](https://img.shields.io/npm/v/alawmulaw.svg?style=for-the-badge)](https://www.npmjs.com/package/alawmulaw) [![Docs](https://img.shields.io/badge/docs-online-blue.svg?style=for-the-badge)](https://rochars.github.io/alawmulaw/index.html)

## Install
```
npm install alawmulaw
```

## A-Law

Full files:
```javascript

const alaw = require("alawmulaw").alaw;

// Compressing all the samples in a file
// Only 16-bit samples are supported
aLawSamples = alaw.encode(pcmSamples);

// Decompressing all the samples in a file
pcmSamples = alaw.decode(aLawSamples);
```

Sample by sample:
```javascript

const alaw = require("alawmulaw").alaw;

// Compressing
aLawSample = alaw.encodeSample(pcmSample);

// Decompressing
pcmSample = alaw.decodeSample(aLawSample);
```

## mu-Law

Full files:
```javascript

const mulaw = require("alawmulaw").mulaw;

// Compressing all the samples in a file
// Only 16-bit samples are supported
muLawSamples = mulaw.encode(pcmSamples);

// Decompressing all the samples in a file
pcmSamples = mulaw.decode(muLawSamples);
```

Sample by sample:
```javascript

const mulaw = require("alawmulaw").mulaw;

// Compressing
muLawSample = mulaw.encodeSample(pcmSample);

// Decompressing
pcmSample = mulaw.decodeSample(muLawSample);
```


## In the browser

```html
<script src="dist/alawmulaw-min.js"></script>
<script>
	// A-Law
    samples = alaw.encode(samples);
    samples = alaw.decode(samples);
    sample = alaw.encodeSample(sample);
    sample = alaw.decodeSample(sample);

    // mu-Law
    samples = mulaw.encode(samples);
    samples = mulaw.decode(samples);
    sample = mulaw.encode(sample);
    sample = mulaw.decode(sample);
</script>
```

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
