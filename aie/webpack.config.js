const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    path: __dirname,
    publicPath: '/',
    filename: './dist/aie.min.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
        { test: /\.css$/, loader: 'style!css' },
        { test: /\.ts?$/, loader: 'awesome-typescript-loader' },
        { test: /\.js$/, loader: 'source-map-loader' }
    ]
  },
  resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new UglifyJSPlugin({
      test: /\.js($|\?)/i,
      sourceMap: true,
      uglifyOptions: {
          compress: true
      }
  }),
  ],
  devServer: {
    hot: true,
    inline: true,
    progress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
  }
}
