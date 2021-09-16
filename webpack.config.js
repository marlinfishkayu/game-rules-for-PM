const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  devServer: {
    contentBase: ['./static', './public'],
    inline: true,
    hot: true,
    port: 9000
  },
  entry: './src/js/main.js',
  mode: 'development',
  output: {
    path: `${__dirname}/dist/static`,
    filename: 'bundle.js',
    publicPath: './public',
    },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'public', 
          to: '../',
        }
      ]
    }),
    new MiniCssExtractPlugin({
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(svg|gif|png|eot|woff|ttf)$/,
        use: [
          'url-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
      extractComments: false,
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          safe: true,
          discardComments: {
              removeAll: true,
          },
        },
      }),
    ],
    },
};