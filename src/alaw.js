/*
 * alaw.js
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * https://github.com/rochars/alawmulaw
 *
 * References:
 * https://github.com/deftio/companders
 * http://dystopiancode.blogspot.com.br/2012/02/pcm-law-and-u-law-companding-algorithms.html
 * 
 */

/**
 * Encode a 16-bit linear PCM sample as 8-bit A-Law.
 * @param {number} sample A 16-bit linear PCM sample
 * @return {number}
 */
function encodeSample(sample) {
    let clip = 32635;
    let logTable = [
        1,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5, 
        6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6, 
        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7, 
        7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7 
    ];
    let sign;
    let exponent;
    let mantissa; 
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
   let sign = 0x00;
   let position = 0;
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
    let pcmSamples = [];
    for (let i=0; i<samples.length; i++) {
        pcmSamples.push(decodeSample(samples[i]));
    }
    return pcmSamples;
}

module.exports.encodeSample = encodeSample;
module.exports.decodeSample = decodeSample;
module.exports.encode = encode;
module.exports.decode = decode;
