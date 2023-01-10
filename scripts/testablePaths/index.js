const Table = require('cli-table');
const allServices = require('../../cypress/support/config/settings/index.js');

let defaultEnvironment = 'all';

if (process.argv.length > 2) {
  defaultEnvironment = process.argv[2];
}

const environmentDomainMappings = {
  local: 'http://localhost:7080',
  test: 'https://www.test.bbc.com',
  live: 'https://www.bbc.com',
};

const getUrls = ({ paths, environment }) => {
  const domain = environmentDomainMappings[environment];

  if (typeof paths === 'string') {
    return `${domain}${paths}`;
  } else {
    return paths.map(path => `${domain}${path}`).join('\n');
  }
};

let testablePaths = [];

const testablePathsTable = new Table({
  head: ['Service', 'Page Type', 'Environment', 'Path(s)']
});

Object.values(allServices).forEach(({ name, variant, pageTypes }) => {
    Object.entries(pageTypes).forEach(([pageType, { environments }]) => {

      if (environments) {
        let filteredEnvironments = environments;

        if (defaultEnvironment !== 'all') {
          filteredEnvironments = ({[defaultEnvironment]: environments[defaultEnvironment]});
        }

        Object.entries(filteredEnvironments).forEach(([environment, { enabled, paths }]) => {
        if (enabled) {
          const serviceNameWithVariant = `${name}${variant === 'default' ? '' : `/${variant}`}`;
          testablePathsTable.push([serviceNameWithVariant, pageType, environment, getUrls({paths, environment})]);
        }
      });
    }
    });
});

console.log(testablePathsTable.toString());
