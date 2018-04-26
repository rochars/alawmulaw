/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * https://github.com/rochars/alawmulaw
 *
 */

let alawmulaw = require('../index.js');

if (process.argv[3] == '--dist') {
    require('browser-env')();let assert = require('assert');
    require('../dist/alawmulaw-min.js');
    alawmulaw = window.alawmulaw;
}

module.exports = alawmulaw;
