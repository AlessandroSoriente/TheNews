const path = require('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin')
const Dotenv = require('dotenv-webpack');
const axios = require("axios");
const lodash = require("lodash");



module.exports = {
    entry: ['./src/js/event.js', './src/js/request.js', './src/js/main.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
          {
            test: /\.(css|sass|scss)$/,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader'
            ],
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                    name:'[name].[ext]',
                    outputPath: 'img/',
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: '../index.html'
        }),
        new Dotenv()
    ],
    devServer: {
        port: 5000,
        open: true,
        static: path.resolve(__dirname, 'dist')
    },
    mode:'development' 
}