/* eslint-disable import/no-dynamic-require, global-require */
const fs = require('fs');

// set the application root path to be set as `context` in the webpack config
const appDirectory = fs.realpathSync(process.cwd());

const getWebpackConfig = require('@bbc/spartacus/webpack.config');

module.exports = (shell = {}) => {
  const CONFIG_FILE = shell.config;

  return getWebpackConfig(CONFIG_FILE, appDirectory);
};
