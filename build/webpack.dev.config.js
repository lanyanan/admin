const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const os = require('os');
const merge = require('webpack-merge');
// const EndWebpackPlugin = require('watch-lint-webpack-plugin');
const common = require('./webpack.common.config');

const networkInterfaces = os.networkInterfaces();

const ip = networkInterfaces.WLAN
  ? networkInterfaces.WLAN[1].address
  : networkInterfaces.wlp4s0[0].address;

process.env.NODE_ENV = 'development';

common.output.publicPath = `http://${ip}:3000/`;

// common.plugins.push(new CleanWebpackPlugin());

common.plugins.push(new webpack.HotModuleReplacementPlugin());

// common.plugins.push(
//   new EndWebpackPlugin(() => {
//   }, (err) => {
//     console.log(err);
//   }),
// );
common.module.rules.unshift({
  enforce: 'pre',
  test: /\.js$/,
  loader: 'eslint-loader',
  include: path.resolve(process.cwd(), 'src'),
  exclude: /node_modules/,
  options: {
    fix: true,
    formatter: require('eslint-friendly-formatter'), // 指定错误报告的格式规范
  },
});

const dev = {
  mode: 'development',
  entry: {
    index: [`webpack-dev-server/client?http://${ip}:3000`, './src/index.js'],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist/'),
    hot: true,
    inline: true,
    historyApiFallback: true,
    host: ip,
    port: '3000',
    proxy: {
      '/api': {
        target: '', // 测试
        host: '',
        changeOrigin: true,
        pathRewrite: { '^/api': '/' },
      },
      '/wechat': {
        target: '', // 测试
        host: '',
        changeOrigin: true,
        pathRewrite: { '^': '/' },
      },
    },
  },
};

module.exports = merge(common, dev);
