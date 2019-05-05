const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require('./webpack.common.config');

process.env.NODE_ENV = 'production';

const entryfile = './src/js/route.js';

// common.plugins.push(
//   new UglifyJsPlugin({
//     uglifyOptions: {
//       compress: {
//         warnings: false,
//         drop_console: true,
//       },
//     },
//   }),
// );

common.plugins.push(
  new OptimizeCSSAssetsPlugin({
    assetNameRegExp: /\.css\.*(?!.*map)/g,
    cssProcessor: require('cssnano'),
    cssProcessorOptions: {
      discardComments: { removeAll: true },
      safe: true,
      autoprefixer: false,
    },
    canPrint: true,
  }),
);


const prod = {
  mode: 'production',
  entry: entryfile,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, ''),
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       uglifyOptions: {
  //         compress: {
  //           warnings: false,
  //           drop_console: true,
  //         },
  //       },
  //     }),
  //   ],
  // },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all', // 对所有引用node——modules文件处理进行提取处理
  //     cacheGroups: {
  //       vendor: {
  //         test: /node_modules\//,
  //         name: 'vendor',
  //         priority: 10,
  //         enforce: true,
  //       },
  //     },
  //   },
  // },
  performance: {
    hints: false,
  },
};
module.exports = merge(prod, common);
