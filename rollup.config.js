/*
 * https://github.com/rochars/byte-data
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview rollup configuration file.
 */

import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

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
      commonjs(),
    ]
  },
  // umd
  {
    input: 'index.js',
    output: [
      {
        file: 'dist/alawmulaw.umd.js',
        name: 'alawmulaw',
        format: 'umd',
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
    ]
  },
  // esm
  {
    input: 'index.js',
    output: [
      {
        file: 'dist/alawmulaw.js',
        format: 'es',
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
    ]
  }
];
