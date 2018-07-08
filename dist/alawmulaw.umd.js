(function (global, factory) {typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :typeof define === 'function' && define.amd ? define(['exports'], factory) :(factory((global.alawmulaw = {})));}(this, (function (exports) {;'use strict';Object.defineProperty(exports, '__esModule', { value: true });var alawmulaw=function(exports){/** @const @type {!Array<number>} */ var LOG_TABLE=[1,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7];/**
 @param {number} sample
 @return {number}
 */
function encodeSample(sample){/** @type {number} */ var compandedValue;sample=sample==-32768?-32767:sample;/** @type {number} */ var sign=~sample>>8&128;if(!sign)sample=sample*-1;if(sample>32635)sample=32635;if(sample>=256){/** @type {number} */ var exponent=LOG_TABLE[sample>>8&127];/** @type {number} */ var mantissa=sample>>exponent+3&15;compandedValue=exponent<<4|mantissa}else compandedValue=sample>>4;return compandedValue^(sign^85)}/**
 @param {number} aLawSample
 @return {number}
 */
function decodeSample(aLawSample){/** @type {number} */ var sign=0;aLawSample^=85;if(aLawSample&128){aLawSample&=~(1<<7);sign=-1}/** @type {number} */ var position=((aLawSample&240)>>4)+4;/** @type {number} */ var decoded=0;if(position!=4)decoded=1<<position|(aLawSample&15)<<position-4|1<<position-5;else decoded=aLawSample<<1|1;decoded=sign===0?decoded:-decoded;return decoded*8*-1}/**
 @param {!Int16Array} samples
 @return {!Uint8Array}
 */
function encode(samples){/** @type {!Uint8Array} */ var aLawSamples=new Uint8Array(samples.length);for(var i=0;i<samples.length;i++)aLawSamples[i]=encodeSample(samples[i]);return aLawSamples}/**
 @param {!Uint8Array} samples
 @return {!Int16Array}
 */
function decode(samples){/** @type {!Int16Array} */ var pcmSamples=new Int16Array(samples.length);for(var i=0;i<samples.length;i++)pcmSamples[i]=decodeSample(samples[i]);return pcmSamples}var alaw=Object.freeze({encodeSample:encodeSample,decodeSample:decodeSample,encode:encode,decode:decode});/** @private @const @type {number} */ var BIAS=132;/** @private @const @type {number} */ var CLIP=32635;/** @private @const @type {Array<number>} */ var encodeTable=[0,0,1,1,2,2,2,2,3,3,3,3,3,3,3,3,4,4,4,4,
4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7];/** @private @const @type {Array<number>} */ var decodeTable=
[0,132,396,924,1980,4092,8316,16764];/**
 @param {number} sample
 @return {number}
 */
function encodeSample$1(sample){/** @type {number} */ var sign;/** @type {number} */ var exponent;/** @type {number} */ var mantissa;/** @type {number} */ var muLawSample;sign=sample>>8&128;if(sign!=0)sample=-sample;if(sample>CLIP)sample=CLIP;sample=sample+BIAS;exponent=encodeTable[sample>>7&255];mantissa=sample>>exponent+3&15;muLawSample=~(sign|exponent<<4|mantissa);return muLawSample}/**
 @param {number} muLawSample
 @return {number}
 */
function decodeSample$1(muLawSample){/** @type {number} */ var sign;/** @type {number} */ var exponent;/** @type {number} */ var mantissa;/** @type {number} */ var sample;muLawSample=~muLawSample;sign=muLawSample&128;exponent=muLawSample>>4&7;mantissa=muLawSample&15;sample=decodeTable[exponent]+(mantissa<<exponent+3);if(sign!=0)sample=-sample;return sample}/**
 @param {!Int16Array} samples
 @return {!Uint8Array}
 */
function encode$1(samples){/** @type {!Uint8Array} */ var muLawSamples=new Uint8Array(samples.length);for(var i=0;i<samples.length;i++)muLawSamples[i]=encodeSample$1(samples[i]);return muLawSamples}/**
 @param {!Uint8Array} samples
 @return {!Int16Array}
 */
function decode$1(samples){/** @type {!Int16Array} */ var pcmSamples=new Int16Array(samples.length);for(var i=0;i<samples.length;i++)pcmSamples[i]=decodeSample$1(samples[i]);return pcmSamples}var mulaw=Object.freeze({encodeSample:encodeSample$1,decodeSample:decodeSample$1,encode:encode$1,decode:decode$1});exports.alaw=alaw;exports.mulaw=mulaw;return exports}({});exports.alaw = alawmulaw.alaw;exports.mulaw = alawmulaw.mulaw;})));
