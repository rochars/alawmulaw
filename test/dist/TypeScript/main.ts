/*
 * Copyright (c) 2018-2019 Rafael da Silva Rocha.
 */

/**
 * @fileoverview TypeScript declaration tests.
 * @see https://github.com/rochars/alawmulaw
 */

import {alaw, mulaw} from '../../../index.js';

console.log(alaw);
console.log(mulaw);
console.log(alaw.encodeSample(0));
