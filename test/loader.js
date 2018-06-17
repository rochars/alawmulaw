/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * https://github.com/rochars/alawmulaw
 *
 */

let alawmulaw;

if (process.argv[3] == '--dist') {
    require('browser-env')();
    require('../dist/alawmulaw.min.js');
    alawmulaw = window.alawmulaw;
} else {
	alawmulaw = require('../index.js');	
}

module.exports = alawmulaw;
