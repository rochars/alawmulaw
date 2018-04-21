/**
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * https://github.com/rochars/alawmulaw
 *
 */

module.exports = {
  entry: './index.js',
  output: {
    filename: './dist/alawmulaw.js'
  },
  module: {
    loaders: [
      {
        test:  /index\.js$/,
        loader: 'string-replace-loader',
        query: {
          multiple: [
            {
              search: 'module.exports.alaw',
              replace: "window['alaw']",
            },
            {
              search: 'module.exports.mulaw',
              replace: "window['mulaw']",
            },
          ]
        }
      }
    ]
  }
};