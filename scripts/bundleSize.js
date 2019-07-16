#! /usr/bin/env node

const ora = require('ora');
const { execSync } = require('child_process');
const chalk = require('chalk');

const services = Object.keys(
  require('../src/app/lib/config/services/loadableConfig'),
);

// Size limit for all bundles used by each service (K)
// Keep these +/- 5K and update frequently!
const MIN = 557;
const MAX = 576;

const getBundleSize = filePattern => {
  const size = execSync(`cat ${filePattern} | wc -c | tr -d ' '`, {
    encoding: 'utf8',
  });

  return Math.round(parseInt(size, 10) / 1000);
};

const getServiceBundleSize = service => {
  return getBundleSize(`build/public/static/js/{main,vendor,${service}}-*.js`);
};

const capitaliseFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const createConsoleError = (service, size, adjective) => {
  return [
    chalk.red('Bundle size for'),
    chalk.red.bold(capitaliseFirstLetter(service)),
    chalk.red(`is too ${adjective} at`),
    chalk.red.bold(`${size} kB.`),
    chalk.red("Please update thresholds in './scripts/bundleSize.js'"),
  ].join(' ');
};

const mapSizeToError = (service, size) => {
  if (size < MIN) {
    return createConsoleError(service, size, 'small');
  }
  if (size > MAX) {
    return createConsoleError(service, size, 'large');
  }
  return undefined;
};

console.log(''); // eslint-disable-line no-console
const spinner = ora({
  text: 'Analysing bundles...',
  color: 'magenta',
});
spinner.start();

let totalSize = 0;
let smallestBundle;
let largestBundle;

const errors = services
  .map(service => {
    const size = getServiceBundleSize(service);

    totalSize += size;

    if (!smallestBundle || size < smallestBundle.size) {
      smallestBundle = { service, size };
    } else if (!largestBundle || size > largestBundle.size) {
      largestBundle = { service, size };
    }

    return mapSizeToError(service, size);
  })
  .filter(item => !!item);

if (errors.length) {
  spinner.fail('Issues with service bundles: ');
  errors.forEach(err => console.error(err)); // eslint-disable-line no-console
} else {
  spinner.succeed('All bundle sizes are good!');
}

const bundlesToLog = [
  {
    name: 'Main bundle',
    size: getBundleSize('build/public/static/js/main-*.js'),
  },
  {
    name: 'Vendor bundle',
    size: getBundleSize('build/public/static/js/vendor-*.js'),
  },
  {
    name: `Smallest bundle`,
    ...smallestBundle,
  },
  {
    name: `Largest bundle`,
    ...largestBundle,
  },
  { name: 'Average bundle', size: Math.round(totalSize / services.length) },
];

const maxSizeDigits = 5;
const formatSize = size => {
  return `${' '.repeat(maxSizeDigits - size.toString().length)} ${size} kB  `;
};

const logBundle = ({ name, size, service }) => {
  // eslint-disable-next-line no-console
  return console.log(
    [
      chalk.green(formatSize(size)),
      name,
      service ? `- ${capitaliseFirstLetter(service)}` : '',
    ].join(' '),
  );
};

console.log('\nBundle size summary:'); // eslint-disable-line no-console
console.log(); // eslint-disable-line no-console
bundlesToLog.forEach(bundleData => {
  logBundle(bundleData);
});
