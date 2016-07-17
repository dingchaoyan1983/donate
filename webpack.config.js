var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var distDir = 'dist';

module.exports = {
  entry: {
    app: path.join(__dirname, 'src', 'client', 'index.js')
  },
  output: {
    path: distDir + '/public',
    filename: '[name].[hash].js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      // {
      //   test: /\.js$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/
      // },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap", "sass-loader?includePaths[]=./node_modules")
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },
  devtool: 'inline-source-map',
  debug: true,
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      hash: false,
      filename: 'index.html',
      inject: 'body',
      favicon: './src/client/styles/favicon.png',
      minify: {
        collapseWhitespace: false
      }
    }),
    new CleanWebpackPlugin(['./'+ distDir + '/public']),
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks: true
    })
  ],
  eslint: {
    configFile: './.eslintrc'
  }
};
