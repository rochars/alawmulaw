/**
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 * https://github.com/rochars/alawmulaw
 *
 */

let alawmulaw;

// Browser
if (process.argv[3] == '--min') {
    require('browser-env')();
    require('../dist/alawmulaw.min.js');
    alawmulaw = window.alawmulaw;

// UMD
} else if (process.argv[3] == '--umd') {
	alawmulaw = require('../dist/alawmulaw.umd.js').alawmulaw;

// CommonJS
} else if (process.argv[3] == '--cjs') {
	alawmulaw = require('../dist/alawmulaw.cjs.js').alawmulaw;

// ESM
} else {
	alawmulaw = require('../index.js').alawmulaw;
}

module.exports = alawmulaw;
