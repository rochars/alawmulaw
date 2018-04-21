/*
 * mulaw.js
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * https://github.com/rochars/alawmulaw
 *
 * Reference:
 * https://github.com/torvalds/linux/blob/master/sound/core/oss/mulaw.c
 * 
 */

let BIAS = 0x84;
let SIGN_BIT = 0x80;
let QUANT_MASK = 0xf;
let SEG_MASK = 0x70;
let SEG_SHIFT = 4;

function valSeg(val) {
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
  if (val & 0x02)
    r += 1;
  return r;
}

/**
 * Encode a 16-bit sample as 8-bit mu-Law.
 * @param {number} sample A 16-bit sample
 * @return {number}
 */
function encodeSampleMuLaw(pcmSample) {
  let mask;
  let seg;
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
  seg = valSeg(pcmSample);
  uval = (seg << 4) | ((pcmSample >> (seg + 3)) & 0xF);
  return uval ^ mask;
}

/**
 * Decode a 8-bit A-Law sample as 16-bit PCM.
 * @param {number} number The 8-bit A-Law sample
 * @return {number}
 */
function decodeSampleMuLaw(muLawSample) {
  let t;
  muLawSample = ~muLawSample;
  t = ((muLawSample & QUANT_MASK) << 3) + BIAS;
  t <<= (muLawSample & SEG_MASK) >> SEG_SHIFT;
  return ((muLawSample & SIGN_BIT) ? (BIAS - t) : (t - BIAS));
}

/**
 * Encode 16-bit PCM samples into 8-bit A-Law samples.
 * @param {!Array<number>} samples A array of 16-bit PCM samples.
 * @return {!Array<number>}
 */
function encodeMuLaw(samples) {
    let muLawSamples = [];
    for (let i=0; i<samples.length; i++) {
        muLawSamples.push(encodeSampleMuLaw(samples[i]));
    }
    return muLawSamples;
}

/**
 * Decode 8-bit A-Law samples into 16-bit PCM samples.
 * @param {!Array<number>} samples A array of 8-bit A-Law samples.
 * @return {!Array<number>}
 */
function decodeMuLaw(samples) {
    let pcmSamples = [];
    for (let i=0; i<samples.length; i++) {
        pcmSamples.push(decodeSampleMuLaw(samples[i]));
    }
    return pcmSamples;
}

module.exports.encodeSample = encodeSampleMuLaw;
module.exports.decodeSample = decodeSampleMuLaw;
module.exports.encode = encodeMuLaw;
module.exports.decode = decodeMuLaw;
