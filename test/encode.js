/*!
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * 
 */

var assert = require('assert');

describe('encode A-Law', function() {
    let alaw = require("../index.js").alaw;
    it("samples.length should be > 0",
        function() {
            assert.ok(alaw.encode([0]));
        });
});

describe('encode mu-Law', function() {
    let mulaw = require("../index.js").mulaw;
    it("samples.length should be > 0",
        function() {
            assert.ok(mulaw.encode([0]));
        });
});