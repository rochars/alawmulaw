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
  // umd, es
  {
    input: 'index.js',
    output: [
      {
        file: 'dist/alawmulaw.umd.js',
        name: 'alawmulaw',
        format: 'umd'
      },
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
