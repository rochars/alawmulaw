/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * alawmulaw
 * JavaScript A-Law and mu-Law codecs.
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * https://github.com/rochars/alawmulaw
 * 
 */

window['alawmulaw'] = {}; window['alawmulaw']['alaw'] = __webpack_require__(1);
window['alawmulaw']['mulaw'] = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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
function  encodeSample(sample) {
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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
 * mulaw.js
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * https://github.com/rochars/alawmulaw
 *
 * Reference:
 * https://github.com/torvalds/linux/blob/master/sound/core/oss/mulaw.c
 * 
 */

const BIAS = 0x84;
const SIGN_BIT = 0x80;
const QUANT_MASK = 0xf;
const SEG_MASK = 0x70;
const SEG_SHIFT = 4;

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
  if (val & 0x02) {
    r += 1;
  }
  return r;
}

/**
 * Encode a 16-bit linear PCM sample as 8-bit mu-Law.
 * @param {number} pcmSample A 16-bit sample
 * @return {number}
 */
function encodeSample(pcmSample) {
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
 * Decode a 8-bit mu-Law sample as 16-bit linear PCM.
 * @param {number} muLawSample The 8-bit mu-Law sample
 * @return {number}
 */
function decodeSample(muLawSample) {
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


/***/ })
/******/ ]);