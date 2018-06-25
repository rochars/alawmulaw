/*
 * alawmulaw: A-Law and mu-Law codecs in JavaScript.
 * https://github.com/rochars/alawmulaw
 *
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

/**
 * @fileoverview A-Law codec.
 * References:
 * https://github.com/deftio/companders
 * http://dystopiancode.blogspot.com.br/2012/02/pcm-law-and-u-law-companding-algorithms.html
 */

/** @module alawmulaw/alaw */

/** @type {!Array<number>} */
const LOG_TABLE = [
  1,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5, 
  6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6, 
  7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7, 
  7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7 
];

/**
 * Encode a 16-bit linear PCM sample as 8-bit A-Law.
 * @param {number} sample A 16-bit linear PCM sample
 * @return {number}
 */
function encodeSample(sample) {
  /** @type {number} */
  let compandedValue; 
  sample = (sample ==-32768) ? -32767 : sample;
  /** @type {number} */
  let sign = ((~sample) >> 8) & 0x80; 
  if (!sign) {
    sample = sample * -1; 
  }
  if (sample > 32635) {
    sample = 32635; 
  }
  if (sample >= 256)  {
    /** @type {number} */
    let exponent = LOG_TABLE[(sample >> 8) & 0x7F];
    /** @type {number} */
    let mantissa = (sample >> (exponent + 3) ) & 0x0F; 
    compandedValue = ((exponent << 4) | mantissa); 
  } else {
    compandedValue = sample >> 4; 
  } 
  return compandedValue ^ (sign ^ 0x55);
}

/**
 * Decode a 8-bit A-Law sample as 16-bit linear PCM.
 * @param {number} aLawSample The 8-bit A-Law sample
 * @return {number}
 */
function decodeSample(aLawSample) {
  /** @type {number} */
  let sign = 0;
  aLawSample ^= 0x55;
  if (aLawSample & 0x80) {
    aLawSample &= ~(1 << 7);
    sign = -1;
  }
  /** @type {number} */
  let position = ((aLawSample & 0xF0) >> 4) + 4;
  /** @type {number} */
  let decoded = 0;
  if (position != 4) {
    decoded = ((1 << position) |
      ((aLawSample & 0x0F) << (position - 4)) |
      (1 << (position - 5)));
  } else {
    decoded = (aLawSample << 1)|1;
  }
  decoded = (sign === 0) ? (decoded) : (-decoded);
  return (decoded * 8) * -1;
}

/**
 * Encode 16-bit linear PCM samples into 8-bit A-Law samples.
 * @param {!Array<number>} samples A array of 16-bit PCM samples.
 * @return {!Array<number>}
 */
function encode(samples) {
  /** @type {!Array<number>} */
  let aLawSamples = [];
  for (let i=0; i<samples.length; i++) {
    aLawSamples.push(encodeSample(samples[i]));
  }
  return aLawSamples;
}

/**
 * Decode 8-bit A-Law samples into 16-bit linear PCM samples.
 * @param {!Array<number>} samples A array of 8-bit A-Law samples.
 * @return {!Array<number>}
 */
function decode(samples) {
  /** @type {!Array<number>} */
  let pcmSamples = [];
  for (let i=0; i<samples.length; i++) {
    pcmSamples.push(decodeSample(samples[i]));
  }
  return pcmSamples;
}

var alaw = /*#__PURE__*/Object.freeze({
  encodeSample: encodeSample,
  decodeSample: decodeSample,
  encode: encode,
  decode: decode
});

/*
 * alawmulaw: A-Law and mu-Law codecs in JavaScript.
 * https://github.com/rochars/alawmulaw
 *
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

/**
 * @fileoverview mu-Law codec.
 * References:
 * https://github.com/torvalds/linux/blob/master/sound/core/oss/mulaw.c
 */

/** @module alawmulaw/mulaw */

/**
 * @type {number}
 * @private
 */
const BIAS = 0x84;

/**
 * Encode a 16-bit linear PCM sample as 8-bit mu-Law.
 * @param {number} pcmSample A 16-bit sample
 * @return {number}
 */
function encodeSample$1(pcmSample) {
  /** @type {number} */
  let mask = 0xFF;
  if (pcmSample < 0) {
    pcmSample = BIAS - pcmSample;
    mask = 0x7F;
  } else {
    pcmSample += BIAS;
  }
  if (pcmSample > 0x7FFF) {
    pcmSample = 0x7FFF;
  }
  /** @type {number} */
  let seg = segmentValue_(pcmSample);
  /** @type {number} */
  let uval = (seg << 4) | ((pcmSample >> (seg + 3)) & 0xF);
  return uval ^ mask;
}

/**
 * Decode a 8-bit mu-Law sample as 16-bit linear PCM.
 * @param {number} muLawSample The 8-bit mu-Law sample
 * @return {number}
 */
function decodeSample$1(muLawSample) {
  muLawSample = ~muLawSample;
  /** @type {number} */
  let t = ((muLawSample & 0xf) << 3) + BIAS;
  t <<= (muLawSample & 0x70) >> 4;
  return ((muLawSample & 0x80) ? (BIAS - t) : (t - BIAS));
}

/**
 * Encode 16-bit linear PCM samples into 8-bit mu-Law samples.
 * @param {!Array<number>} samples A array of 16-bit linear PCM samples.
 * @return {!Array<number>}
 */
function encode$1(samples) {
  /** @type {!Array<number>} */
  let muLawSamples = [];
  for (let i=0; i<samples.length; i++) {
    muLawSamples.push(encodeSample$1(samples[i]));
  }
  return muLawSamples;
}

/**
 * Decode 8-bit mu-Law samples into 16-bit linear PCM samples.
 * @param {!Array<number>} samples A array of 8-bit mu-Law samples.
 * @return {!Array<number>}
 */
function decode$1(samples) {
  /** @type {!Array<number>} */
  let pcmSamples = [];
  for (let i=0; i<samples.length; i++) {
    pcmSamples.push(decodeSample$1(samples[i]));
  }
  return pcmSamples;
}

/**
 * Return the segment value of a PCM sample.
 * @param {number} sample
 * @return {number}
 * @private
 */
function segmentValue_(sample) {
  /** @type {number} */
  let segment = 0;
  sample >>= 7;
  if (sample & 0xf0) {
    sample >>= 4;
    segment += 4;
  }
  if (sample & 0x0c) {
    sample >>= 2;
    segment += 2;
  }
  if (sample & 0x02) {
    segment += 1;
  }
  return segment;
}

var mulaw = /*#__PURE__*/Object.freeze({
  encodeSample: encodeSample$1,
  decodeSample: decodeSample$1,
  encode: encode$1,
  decode: decode$1
});

/*
 * alawmulaw: A-Law and mu-Law codecs in JavaScript.
 * https://github.com/rochars/alawmulaw
 *
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

var index = {
	/**
	 * @type {!Object}
	 * @export
	 */
	'alaw': alaw,
	/**
	 * @type {!Object}
	 * @export
	 */
	'mulaw': mulaw
};

export default index;
