/*!
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * 
 */

var assert = require('assert');
let alawmulaw = require("../test/loader.js");

describe('decode A-Law', function() {
    it("Should decode 8-bit A-Law values as 16-bit",
        function() {
            assert.deepEqual([-5504], alawmulaw.alaw.decode([0]));
            assert.deepEqual([848], alawmulaw.alaw.decode([255]));
            assert.deepEqual([5504], alawmulaw.alaw.decode([128]));
        });
});

describe('decode mu-Law', function() {
    it("Should decode 8-bit mu-Law values as 16-bit",
        function() {
            assert.deepEqual([-32124], alawmulaw.mulaw.decode([0]));
            assert.deepEqual([0], alawmulaw.mulaw.decode([255]));
            assert.deepEqual([32124], alawmulaw.mulaw.decode([128]));
        });
});