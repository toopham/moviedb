const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [ './client/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  devServer: {
    // Required for docker if needed
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    // fallback to root for other urls
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
    plugins: [
      new HtmlWebpackPlugin({
        favicon: path.resolve(__dirname, './client/assets/images/moviedb.ico'),
        template: './client/index.html'
      })
    ]
  },
  resolve: {
    //Enable importing js or jsx without specifying type
    extensions: ['.js', '.jsx'],
  },
}