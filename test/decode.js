/*!
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * 
 */

var assert = require('assert');

describe('decode A-Law', function() {
    let alaw = require("../index.js").alaw;
    it("samples.length should be > 0",
        function() {
            assert.ok(alaw.decode([0]));
        });
});

describe('decode mu-Law', function() {
    let mulaw = require("../index.js").mulaw;
    it("samples.length should be > 0",
        function() {
            assert.ok(mulaw.decode([0]));
        });
});