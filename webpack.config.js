/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './src/index.js',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['node8']
          }
        }]
      }
    ]
  },
  stats: {
    colors: true
  },
  output: {
    libraryTarget: 'commonjs',
    filename: './index.js',
  },
};