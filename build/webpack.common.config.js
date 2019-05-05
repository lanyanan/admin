const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const timestamp = new Date().getTime();
// const devMode = process.env.NODE_ENV !== 'production';

// const EndWebpackPlugin = require('watch-lint-webpack-plugin');

module.exports = {
  // output: {
  //   filename: '[name].bundle.js',
  //   path: path.resolve(__dirname, '../dist'),
  //   chunkFilename: '[name].bundle.js',
  // },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     title: 'Output Management',
  //     filename: 'index.html',
  //     template: 'index.html',
  //   }),
  //   new MiniCssExtractPlugin({
  //     filename: '[name].css',
  //     chunkFilename: '[id].css',
  //   }),
  //   // new EndWebpackPlugin((stats) => {

  //   // }, (err) => {
  //   //   console.log(err);
  //   // }),
  // ],

  // entry: {
  //   index: ['./src/index.js'],
  // },
  module: {
    rules: [
      {
        test: /(?:\.js|\.jsx|\.es6)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [
          path.join(process.cwd(), './src'),
        ],
      },
      // 编译css
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // 编译less
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: true,
            modules: true,
            localIdentName: '[local]__[hash:base64:5]',
          },
        }, 'less-loader'],
      },
      // 编译加载图片及字体
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 5000,
            outputPath: 'images',
          },
        }],
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('node_modules'),
    ],
    extensions: ['.js', '.jsx', '.es6', '.less', '.css'],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'index-[hash:8].js',
    chunkFilename: 'js/[name].chunk-[chunkhash:8].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      version: timestamp,
      template: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:8].css',
      chunkFilename: 'css/[id]-[contenthash:8].css',
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dll-manifest.json'),
    }),
  ],
  performance: {
    // hints: 'warning', // 枚举
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
    maxAssetSize: 2000000, // 整数类型（以字节为单位）
    maxEntrypointSize: 5000000, // 整数类型（以字节为单位）
    assetFilter(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    },
  },
};
