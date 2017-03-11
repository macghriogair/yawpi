var webpack = require('webpack');
var path = require('path');

var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './src/main.js',
  target: 'node',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.json$/,
            exclude: /node_modules/,
            loader: 'json-loader'
        }
    ]
  },
  externals: nodeModules,
  plugins: [
      new webpack.IgnorePlugin(/\.(css|less)$/)
  ]
};
