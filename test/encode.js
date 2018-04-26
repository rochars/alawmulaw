/*!
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * 
 */

var assert = require('assert');
let alawmulaw = require("../index.js");

describe('encode A-Law', function() {
    
    it("Should encode 16-bit values as 8-bit A-Law",
        function() {
            assert.deepEqual([213], alawmulaw.alaw.encode([0]));
            assert.deepEqual([250], alawmulaw.alaw.encode([1000]));
            assert.deepEqual([170], alawmulaw.alaw.encode([1000000]));
            assert.deepEqual([122], alawmulaw.alaw.encode([-1000]));
        });
});

describe('encode mu-Law', function() {
    it("Should encode 16-bit values as 8-bit mu-Law",
        function() {
            assert.deepEqual([255], alawmulaw.mulaw.encode([0]));
            assert.deepEqual([206], alawmulaw.mulaw.encode([1000]));
            assert.deepEqual([128], alawmulaw.mulaw.encode([1000000]));
            assert.deepEqual([78], alawmulaw.mulaw.encode([-1000]));
        });
});