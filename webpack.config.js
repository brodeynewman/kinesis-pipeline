const path = require('path');
const webpack = require('webpack');
const slsw = require('serverless-webpack');
const externals = require('webpack-node-externals');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: slsw.lib.entries,
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
  },
  externals: [externals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  stats: 'minimal',
  devtool: 'source-map',
  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/^.*\/aws-sdk$/),
  ],
};
