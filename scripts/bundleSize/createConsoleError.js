const chalk = require('chalk');

module.exports = ({ service, pageType, size, adjective }) =>
  [
    chalk.red('Bundle size for'),
    chalk.red.bold(`${service} ${pageType}`),
    chalk.red(`is too ${adjective} at`),
    chalk.red.bold(`${size} kB.`),
    chalk.red("Please update thresholds in './scripts/bundleSizeConfig.js'"),
  ].join(' ');
