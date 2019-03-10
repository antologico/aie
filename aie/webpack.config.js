const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    publicPath: '/lib',
    filename: './index.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
        { test: /\.ts?$/, loader: 'awesome-typescript-loader' },
        { test: /\.js$/, loader: 'source-map-loader' }
    ]
  },
  resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
  },
}
