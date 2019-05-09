const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const devtoolModule = {
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

const aieModule = {
  entry: './dev/aie.js',
  output: {
    path: __dirname,
    publicPath: '/',
    filename: './dist/panel/aie.min.js'
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


module.exports = [
  devtoolModule,
  aieModule,
]
