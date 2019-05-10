const path = require('path');
const webpack = require('webpack');
const pkg = require('../package.json');

module.exports = {
  output: {
    path: path.join(process.cwd(), './dist'),
    filename: '[name].js',
    library: '[name]',
  },
  entry: {
    nodedll: pkg.dlls,
  },
  plugins: [
    new webpack.DllPlugin({
      path: './dll/dll-manifest.json',
      name: '[name]',
      context: __dirname,
    }),
  ],
  optimization: {
    minimize: true,
  },
};
