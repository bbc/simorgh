#! /usr/bin/env node

/* eslint-disable no-console */

const ora = require('ora');
const { execSync } = require('child_process');
const chalk = require('chalk');

// Size limit for all bundles used by each service (K)
// Keep these +/- 5K and update frequently!
const MIN = 605;
const MAX = 625;

const services = [
  'afaanoromoo',
  'afrique',
  'amharic',
  'arabic',
  'azeri',
  'bengali',
  'burmese',
  'cymrufyw',
  'gahuza',
  'gujarati',
  'hausa',
  'hindi',
  'igbo',
  'indonesia',
  'japanese',
  'korean',
  'kyrgyz',
  'marathi',
  'mundo',
  'naidheachdan',
  'nepali',
  'news',
  'pashto',
  'persian',
  'pidgin',
  'portuguese',
  'punjabi',
  'russian',
  'serbian',
  'sinhala',
  'somali',
  'swahili',
  'tamil',
  'telugu',
  'thai',
  'tigrinya',
  'turkce',
  'ukchina',
  'ukrainian',
  'urdu',
  'uzbek',
  'vietnamese',
  'yoruba',
  'zhongwen',
];

function getBundleSize(filePattern) {
  const size = execSync(`cat ${filePattern} | wc -c | tr -d ' '`, {
    encoding: 'utf8',
  });

  return Math.round(parseInt(size, 10) / 1000);
}

function getServiceBundleSize(service) {
  return getBundleSize(`build/public/static/js/{main,vendor,${service}}-*.js`);
}

function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function createConsoleError(service, size, adjective) {
  return [
    chalk.red('Bundle size for'),
    chalk.red.bold(capitaliseFirstLetter(service)),
    chalk.red(`is too ${adjective} at`),
    chalk.red.bold(`${size} kB.`),
    chalk.red("Please update thresholds in './scripts/bundleSize.js'"),
  ].join(' ');
}

function mapSizeToError(service, size) {
  if (size < MIN) {
    return createConsoleError(service, size, 'small');
  }
  if (size > MAX) {
    return createConsoleError(service, size, 'large');
  }
  return undefined;
}

console.log('');
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
    size: smallestBundle.size,
    service: smallestBundle.service,
  },
  {
    name: `Largest bundle`,
    size: largestBundle.size,
    service: largestBundle.service,
  },
  { name: 'Average bundle', size: Math.round(totalSize / services.length) },
];

const maxSizeDigits = 5;
function formatSize(size) {
  return `${' '.repeat(maxSizeDigits - size.toString().length)} ${size} kB  `;
}

function logBundle({ name, size, service }) {
  return console.log(
    [
      chalk.green(formatSize(size)),
      name,
      service ? `- ${capitaliseFirstLetter(service)}` : '',
    ].join(' '),
  );
}

console.log('');
console.log('Bundle size summary:');
console.log();
bundlesToLog.forEach(bundleData => {
  logBundle(bundleData);
});
