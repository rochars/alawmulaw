/*!
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * 
 */

var chai = chai || require("chai");
var alawmulaw = alawmulaw || require('../../test/loader.js');
var assert = chai.assert;

describe('decode A-Law', function() {
    it("alaw decode Uint8Array([128])", function() {
        assert.deepEqual(new Int16Array([5504]), alawmulaw.alaw.decode(new Uint8Array([128])));
    });
    it("alaw decode Uint8Array([255])", function() {
        assert.deepEqual(new Int16Array([848]), alawmulaw.alaw.decode(new Uint8Array([255])));
    });
    it("alaw.decode Uint8Array([0, 255])", function() {
        assert.deepEqual(new Int16Array([-5504, 848]), alawmulaw.alaw.decode(new Uint8Array([0, 255])));
    });

    it("alaw.decodeSample 0", function() {
        assert.deepEqual(-5504, alawmulaw.alaw.decodeSample(0));
    });
    it("alaw.decodeSample 255", function() {
        assert.deepEqual(848, alawmulaw.alaw.decodeSample(255));
    });
    it("alaw.decodeSample 128", function() {
        assert.deepEqual(5504, alawmulaw.alaw.decodeSample(128));
    });
});

describe('decode mu-Law', function() {
    it("mulaw.decode Uint8Array([128])", function() {
        assert.deepEqual(new Int16Array([32124]), alawmulaw.mulaw.decode(new Uint8Array([128])));
    });
    it("mulaw.decode Uint8Array([255])", function() {
        assert.deepEqual(new Int16Array([0]), alawmulaw.mulaw.decode(new Uint8Array([255])));
    });
    it("mulaw.decode Uint8Array([0, 255])", function() {
        assert.deepEqual(new Int16Array([-32124, 0]), alawmulaw.mulaw.decode(new Uint8Array([0, 255])));
    });

    it("mulaw.decode 128", function() {
        assert.deepEqual(32124, alawmulaw.mulaw.decodeSample(128));
    });
    it("mulaw.decode 255", function() {
        assert.deepEqual(0, alawmulaw.mulaw.decodeSample(255));
    });
    it("mulaw.decode 0", function() {
        assert.deepEqual(-32124, alawmulaw.mulaw.decodeSample(0));
    });
});
