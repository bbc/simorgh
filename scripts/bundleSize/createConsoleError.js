import { red } from 'chalk';

export default ({ service, pageType, size, adjective }) =>
  [
    red('Bundle size for'),
    red.bold(`${service} ${pageType}`),
    red(`is too ${adjective} at`),
    red.bold(`${size} kB.`),
    red(
      "Please update thresholds in './scripts/bundleSize/bundleSizeConfig.js'",
    ),
  ].join(' ');
