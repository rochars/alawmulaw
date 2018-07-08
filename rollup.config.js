/*
 * https://github.com/rochars/alawmulaw
 * Copyright (c) 2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview rollup configuration file.
 */

import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import closure from 'rollup-plugin-closure-compiler-js';

// Read externs definitions
const fs = require('fs');
let externsSrc = fs.readFileSync('./externs.js', 'utf8');


// CJS wrapper
let CJSBanner = "'use strict';Object.defineProperty(" +
  "exports, '__esModule', { value: true });";
let CJSFooter = 'exports.alaw = alawmulaw.alaw;' +
  'exports.mulaw = alawmulaw.mulaw;';

// UMD wrapper
let UMDBanner = '(function (global, factory) {' +
  "typeof exports === 'object' && " +
  "typeof module !== 'undefined' ? factory(exports) :" +
  "typeof define === 'function' && define.amd ? " +
  "define(['exports'], factory) :" +
  '(factory((global.alawmulaw = {})));' +
  '}(this, (function (exports) {;' + CJSBanner;
let UMDFooter = CJSFooter + '})));';

export default [
  // cjs
  {
    input: 'index.js',
    output: [
      {
        file: 'dist/alawmulaw.cjs.js',
        name: 'alawmulaw',
        format: 'cjs'
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs()
    ]
  },
  // es
  {
    input: 'index.js',
    output: [
      {
        file: 'dist/alawmulaw.js',
        format: 'es'
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs()
    ]
  },
  // umd
  {
    input: 'index.js',
    output: [
      {
        file: 'dist/alawmulaw.umd.js',
        name: 'alawmulaw',
        format: 'iife'
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      closure({
        languageIn: 'ECMASCRIPT6',
        languageOut: 'ECMASCRIPT5',
        compilationLevel: 'WHITESPACE_ONLY',
        warningLevel: 'VERBOSE',
        preserveTypeAnnotations: true,
        outputWrapper: UMDBanner + '%output%' + UMDFooter
      })
    ]
  },
  // browser
  {
    input: 'index.js',
    output: [
      {
        name: 'alawmulaw',
        format: 'iife',
        file: 'dist/alawmulaw.min.js',
        footer: 'window["alawmulaw"]=alawmulaw;'
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      closure({
        languageIn: 'ECMASCRIPT6',
        languageOut: 'ECMASCRIPT5',
        compilationLevel: 'ADVANCED',
        warningLevel: 'VERBOSE',
        externs: [{src:externsSrc}]
      })
    ]
  }
];
