const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { GenerateSW } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
    disableHostCheck: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
         test: /\.(png|jpg|gif)$/,
         use: [
           {
             loader: 'url-loader',
             options: {
               limit: 8192
             }
           }
         ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
    new HtmlWebpackPlugin({
      meta: { viewport: 'width=device-width, initial-scale=1' },
      title: 'App',
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/icon.ico', to: 'favicon.ico' },
    ]),
    new VueLoaderPlugin(),
    new GenerateSW({
      swDest: 'service-worker.js',
      include: [ /\.html$/, /\.js$/, /\.css$/, /favicon.ico$/ ],
    }),
    new WebpackPwaManifest({
      name: 'My PWA',
      short_name: 'MyPWA',
      description: 'My Progressive Web App',
      background_color: '#ffffff',
      icons: [
        {
          src: path.resolve('src/assets/icon.png'),
          sizes: [ 196 ],
        },
      ],
    }),
  ]
};
