/**
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * https://github.com/rochars/alawmulaw
 *
 */
const ClosureCompiler = require('google-closure-compiler-js').webpack;
module.exports = {
  entry: './index.js',
  output: {
    filename: './dist/alawmulaw-min.js'
  },
  plugins: [
    new ClosureCompiler({
      options: {
        languageIn: 'ECMASCRIPT6',
        languageOut: 'ECMASCRIPT5',
        compilationLevel: 'ADVANCED',
        warningLevel: "VERBOSE"
      }
    })
  ],
  module: {
    loaders: [
      {
        test:  /index\.js$/,
        loader: 'string-replace-loader',
        query: {
          multiple: [
            {
              search: 'module.exports.alaw = ',
              replace: "window['alawmulaw'] = window['alawmulaw'] || {};" + 
                       "window['alawmulaw']['alaw'] = "
            },
            {
              search: 'module.exports.mulaw = ',
              replace: "window['alawmulaw']['mulaw'] = ",
            },
          ]
        }
      }
    ]
  }
};