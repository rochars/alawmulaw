/*
 * https://github.com/rochars/wavefile
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview webpack configuration file.
 */

const ClosureCompiler = require('google-closure-compiler-js').webpack;

module.exports = [
  // Browser dist with dependencies, compiled.
  {
    entry: './index.js',
    mode: 'production',
    resolve: {
      mainFields: ['module', 'main']
    },
    optimization: {minimize:false},
    output: {
      filename: 'alawmulaw.min.js',
      library: "alawmulaw",
      libraryTarget: "window"
    },
    plugins: [
      new ClosureCompiler({
        options: {
          languageIn: 'ECMASCRIPT6',
          languageOut: 'ECMASCRIPT5',
          compilationLevel: 'ADVANCED',
          warningLevel: 'VERBOSE',
          exportLocalPropertyDefinitions: true,
          generateExports: true,
          outputWrapper: '%output%window.' + 
            'alawmulaw=window.alawmulaw.default;'
        }
      })
    ]
  },
  // Browser dist with dependencies, compiled.
  {
    entry: './index.js',
    mode: 'production',
    resolve: {
      mainFields: ['module', 'main']
    },
    optimization: {minimize:false},
    output: {
      filename: 'alawmulaw.browser.js',
      library: "alawmulaw",
      libraryTarget: "window"
    }
  }
];
