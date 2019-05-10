const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');
const dllConfig = require('./dll.config.js');

const rootPath = path.resolve(__dirname, '../');

const staticInput = path.resolve(rootPath, 'public');
const staticOutput = path.resolve(rootPath, 'dist');

fs.emptyDirSync(staticOutput);
fs.ensureDirSync(staticInput);
fs.ensureDirSync(staticOutput);

const task = async () => {
  await fs.copy(staticInput, staticOutput); // copy static files
  // 编译dll
  await (new Promise((resolve, reject) => {
    webpack(dllConfig, err => (err ? reject(err) : resolve('done')));
  }));
  console.log('Everything is ready! Begin build...');
};

task();
