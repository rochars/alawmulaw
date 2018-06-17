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

/**
 * Encode a 16-bit linear PCM sample as 8-bit A-Law.
 * @param {number} sample A 16-bit linear PCM sample
 * @return {number}
 */
function encodeSample(sample) {
    /** @type {number} */
    let clip = 32635;
    /** @type {!Array<number>} */
    let logTable = [
        1,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5, 
        6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6, 
        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7, 
        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7 
    ];
    /** @type {number} */
    let sign;
    /** @type {number} */
    let exponent;
    /** @type {number} */
    let mantissa; 
    /** @type {number} */
    let compandedValue; 
    sample = (sample ==-32768) ? -32767 : sample;
    sign = ((~sample) >> 8) & 0x80; 
    if (!sign) {
        sample = sample * -1; 
    }
    if (sample > clip) {
        sample = clip; 
    }
    if (sample >= 256)  { 
        exponent = logTable[(sample >> 8) & 0x7F]; 
        mantissa = (sample >> (exponent + 3) ) & 0x0F; 
        compandedValue = ((exponent << 4) | mantissa); 
    } else {
        compandedValue = sample >> 4; 
    } 
    compandedValue ^= (sign ^ 0x55); 
    return compandedValue; 
}

/**
 * Decode a 8-bit A-Law sample as 16-bit linear PCM.
 * @param {number} aLawSample The 8-bit A-Law sample
 * @return {number}
 */
function decodeSample(aLawSample) {
  /** @type {number} */
   let sign = 0x00;
   /** @type {number} */
   let position = 0;
   /** @type {number} */
   let decoded = 0;
   aLawSample ^= 0x55;
   if (aLawSample & 0x80) {
      aLawSample &= ~(1 << 7);
      sign = -1;
   }
   position = ((aLawSample & 0xF0) >> 4) + 4;
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

/** @export */
module.exports.encodeSample = encodeSample;
/** @export */
module.exports.decodeSample = decodeSample;
/** @export */
module.exports.encode = encode;
/** @export */
module.exports.decode = decode;
