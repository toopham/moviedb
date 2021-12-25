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
    port: 8080,
    hot: true,
    historyApiFallback: true,
    static: {
      publicPath: '/dist',
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
          options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
        },
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      //favicon: path.resolve(__dirname, './client/assets/images/moviedb.ico'),
      template: './client/index.html'
    })
  ],
  resolve: {
    //Enable importing js or jsx without specifying type
    extensions: ['.js', '.jsx'],
  },
}