/**
 * Copyright (c) 2017-2019 Rafael da Silva Rocha.
 * https://github.com/rochars/alawmulaw
 *
 */

let alawmulaw;

if (process.argv[3] == '--umd') {
	console.log('umd');
	alawmulaw = require('../dist/alawmulaw.js');

// source
} else {
	console.log('source');
	require = require("esm")(module);
	global.module = module;
	alawmulaw = require('../index.js');
}

module.exports = alawmulaw;
