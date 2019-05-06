const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
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

common.plugins.push(new CleanWebpackPlugin());

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
    contentBase: path.join(__dirname, '../'),
    hot: true,
    inline: true,
    historyApiFallback: true,
    host: ip,
    port: '3000',
    proxy: {
      '/api': {
        target: 'http://appapi.dadi01.net', // 测试
        // target: "http://wx.rizili.com.cn",// 预发布
        // target:"http://local-api.rizili.com/",
        // host:"local-api.rizili.com",
        // target:"http://www.ucoauth.com",
        // host:'10.11.1.8',
        host: 'appapi.dadi01.net',
        changeOrigin: true,
        pathRewrite: { '^/api': '/' },
      },
      '/wechat': {
        target: 'http://rizili.dadi01.net', // 测试
        host: 'rizili.dadi01.net',
        changeOrigin: true,
        pathRewrite: { '^/wechat/wechat': '/' },
      },
    },
  },
};

module.exports = merge(common, dev);
