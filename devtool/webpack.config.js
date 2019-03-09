const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './dev/panel/script/index.js',
  output: {
    path: __dirname,
    publicPath: '/',
    filename: './dist/panel/panel.min.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
        { test: /\.css$/, loader: 'style!css' },
        { test: /\.js$/, loader: 'source-map-loader' }
    ]
  },
  resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
  },
  plugins: [
    new UglifyJSPlugin({
      test: /\.js($|\?)/i,
      sourceMap: true,
      uglifyOptions: {
          compress: true
      }
    }),
  ],
}
