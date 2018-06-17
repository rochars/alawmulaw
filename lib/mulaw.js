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
 * @type {number}
 * @private
 */
const SIGN_BIT = 0x80;
/**
 * @type {number}
 * @private
 */
const QUANT_MASK = 0xf;
/**
 * @type {number}
 * @private
 */
const SEG_MASK = 0x70;
/**
 * @type {number}
 * @private
 */
const SEG_SHIFT = 4;

/**
 * Encode a 16-bit linear PCM sample as 8-bit mu-Law.
 * @param {number} pcmSample A 16-bit sample
 * @return {number}
 */
function encodeSample(pcmSample) {
  /** @type {number} */
  let mask;
  /** @type {number} */
  let seg;
  /** @type {number} */
  let uval;
  if (pcmSample < 0) {
    pcmSample = BIAS - pcmSample;
    mask = 0x7F;
  } else {
    pcmSample += BIAS;
    mask = 0xFF;
  }
  if (pcmSample > 0x7FFF) {
    pcmSample = 0x7FFF;
  }
  seg = valSeg_(pcmSample);
  uval = (seg << 4) | ((pcmSample >> (seg + 3)) & 0xF);
  return uval ^ mask;
}

/**
 * Decode a 8-bit mu-Law sample as 16-bit linear PCM.
 * @param {number} muLawSample The 8-bit mu-Law sample
 * @return {number}
 */
function decodeSample(muLawSample) {
  /** @type {number} */
  let t;
  muLawSample = ~muLawSample;
  t = ((muLawSample & QUANT_MASK) << 3) + BIAS;
  t <<= (muLawSample & SEG_MASK) >> SEG_SHIFT;
  return ((muLawSample & SIGN_BIT) ? (BIAS - t) : (t - BIAS));
}

/**
 * Encode 16-bit linear PCM samples into 8-bit mu-Law samples.
 * @param {!Array<number>} samples A array of 16-bit linear PCM samples.
 * @return {!Array<number>}
 */
function encode(samples) {
  /** @type {!Array<number>} */
    let muLawSamples = [];
    for (let i=0; i<samples.length; i++) {
        muLawSamples.push(encodeSample(samples[i]));
    }
    return muLawSamples;
}

/**
 * Decode 8-bit mu-Law samples into 16-bit linear PCM samples.
 * @param {!Array<number>} samples A array of 8-bit mu-Law samples.
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

/**
 * @param {number} val
 * @return {number}
 * @private
 */
function valSeg_(val) {
  /** @type {number} */
  let r = 0;
  val >>= 7;
  if (val & 0xf0) {
    val >>= 4;
    r += 4;
  }
  if (val & 0x0c) {
    val >>= 2;
    r += 2;
  }
  if (val & 0x02) {
    r += 1;
  }
  return r;
}

/** @export */
module.exports.encodeSample = encodeSample;
/** @export */
module.exports.decodeSample = decodeSample;
/** @export */
module.exports.encode = encode;
/** @export */
module.exports.decode = decode;
