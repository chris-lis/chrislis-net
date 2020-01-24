// @ts-check
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

/** @type import('webpack').Configuration */
const config = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      title: 'Chris Lis | Home',
    }),
    new ForkTsCheckerWebpackPlugin()
  ]
}

/** @type import('webpack').ConfigurationFactory */
module.exports = (env, args) => {
  return config
}

