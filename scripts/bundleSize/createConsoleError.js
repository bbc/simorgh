import chalk from 'chalk';

export default ({ service, pageType, size, adjective }) =>
  [
    chalk.red('Bundle size for'),
    chalk.red.bold(`${service} ${pageType}`),
    chalk.red(`is too ${adjective} at`),
    chalk.red.bold(`${size} kB.`),
    chalk.red(
      "Please update thresholds in './scripts/bundleSize/bundleSizeConfig.js'",
    ),
  ].join(' ');
