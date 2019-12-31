/*!
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * 
 */

var chai = chai || require("chai");
var alawmulaw = alawmulaw || require('../../test/loader.js');
var assert = chai.assert;

describe('encode A-Law', function() {
    it("Should encode 16-bit values as 8-bit A-Law with encode()", function() {
        assert.deepEqual(new Uint8Array([213, 250]), alawmulaw.alaw.encode(new Int16Array([0, 1000])));
    });
    it("Should encode 16-bit values as 8-bit A-Law with encode()", function() {
        assert.deepEqual(new Uint8Array([250]), alawmulaw.alaw.encode(new Int16Array([1000])));
    });
    it("Should encode 16-bit values as 8-bit A-Law with encode()", function() {
        assert.deepEqual(new Uint8Array([122]), alawmulaw.alaw.encode(new Int16Array([-1000])));
    });

    it("Should encode 16-bit values as 8-bit A-Law with encodeSample()", function() {
        assert.deepEqual(213, alawmulaw.alaw.encodeSample(0));
    });
    it("Should encode 16-bit values as 8-bit A-Law with encodeSample()", function() {
        assert.deepEqual(250, alawmulaw.alaw.encodeSample(1000));
    });
    it("Should encode 16-bit values as 8-bit A-Law with encodeSample()", function() {
        assert.deepEqual(122, alawmulaw.alaw.encodeSample(-1000));
    });
});

describe('encode mu-Law', function() {
    it("Should encode 16-bit values as 8-bit mu-Law with encode()", function() {
        assert.deepEqual(new Uint8Array([255, 206]), alawmulaw.mulaw.encode(new Int16Array([0, 1000])));
    });
    it("Should encode 16-bit values as 8-bit mu-Law with encode()", function() {
        assert.deepEqual(new Uint8Array([206]), alawmulaw.mulaw.encode(new Int16Array([1000])));
    });
    it("Should encode 16-bit values as 8-bit mu-Law with encode()", function() {
        assert.deepEqual(new Uint8Array([78]), alawmulaw.mulaw.encode(new Int16Array([-1000])));
    });

    it("Should encode 16-bit values as 8-bit mu-Law encodeSample", function() {
        assert.deepEqual(-1, alawmulaw.mulaw.encodeSample(0));
    });
    it("Should encode 16-bit values as 8-bit mu-Law encodeSample", function() {
        assert.deepEqual(-50, alawmulaw.mulaw.encodeSample(1000));
    });
    it("Should encode 16-bit values as 8-bit mu-Law encodeSample", function() {
        assert.deepEqual(-178, alawmulaw.mulaw.encodeSample(-1000));
    });
});
