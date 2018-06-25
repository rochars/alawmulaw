/**
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 * https://github.com/rochars/alawmulaw
 *
 */

let alawmulaw;

// Browser
if (process.argv[3] == '--min') {
    console.log('browser');
    require('browser-env')();
    require('../dist/alawmulaw.min.js');
    alawmulaw = window.alawmulaw;

// UMD
} else if (process.argv[3] == '--umd') {
	console.log('umd');
	alawmulaw = require('../dist/alawmulaw.umd.js');

// CommonJS
} else if (process.argv[3] == '--cjs') {
	console.log('cjs');
	alawmulaw = require('../dist/alawmulaw.cjs.js');

// esm
} else if (process.argv[3] == '--esm') {
	console.log('esm');
	alawmulaw = require('../dist/alawmulaw.js').default;

// source
} else {
	console.log('source');
	alawmulaw = require('../index.js').default;
}

module.exports = alawmulaw;
