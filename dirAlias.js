const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  webpackDirAlias: {
    '#app': resolvePath('src/app'),
    '#src': resolvePath('src'),
    '#nextjs': resolvePath('ws-nextjs-app/'),
    '#contexts': resolvePath('src/app/contexts'),
    '#components': resolvePath('src/app/legacy/components'),
    '#containers': resolvePath('src/app/legacy/containers'),
    '#data': resolvePath('data/'),
    '#hooks': resolvePath('src/app/hooks'),
    '#psammead': resolvePath('src/app/legacy/psammead'),
    '#lib': resolvePath('src/app/lib/'),
    '#models': resolvePath('src/app/models/'),
    '#pages': resolvePath('src/app/pages/'),
    '#testHelpers': resolvePath('src/testHelpers/'),
    '#server': resolvePath('src/server/'),
    '#storybook': resolvePath('.storybook/'),
    '#cypress': resolvePath('cypress/'),
  },
  jestDirAlias: {
    '^#app(.*)$': '<rootDir>/src/app$1',
    '^#src(.*)$': '<rootDir>/src$1',
    '^#nextjs(.*)$': '<rootDir>/ws-nextjs-app$1',
    '^#contexts(.*)$': '<rootDir>/src/app/contexts$1',
    '^#components(.*)$': '<rootDir>/src/app/legacy/components$1',
    '^#containers(.*)$': '<rootDir>/src/app/legacy/containers$1',
    '^#data(.*)$': '<rootDir>/data$1',
    '^#hooks(.*)$': '<rootDir>/src/app/hooks$1',
    '^#psammead(.*)$': '<rootDir>/src/app/legacy/psammead$1',
    '^#lib(.*)$': '<rootDir>/src/app/lib$1',
    '^#models(.*)$': '<rootDir>/src/app/models$1',
    '^#pages(.*)$': '<rootDir>/src/app/pages$1',
    '^#testHelpers(.*)$': '<rootDir>/src/testHelpers$1',
    '^#server(.*)$': '<rootDir>/src/server$1',
    '^#storybook(.*)$': '<rootDir>/.storybook$1',
    '^#cypress(.*)$': '<rootDir>/cypress$1',
  },
  eslintDirAlias: {
    map: [
      ['#app', './src/app'],
      ['#src', './src'],
      ['#nextjs', './ws-nextjs-app'],
      ['#contexts', './src/app/contexts'],
      ['#components', './src/app/legacy/components'],
      ['#containers', './src/app/legacy/containers'],
      ['#data', './data'],
      ['#hooks', './src/app/hooks'],
      ['#lib', './src/app/lib'],
      ['#psammead', './src/app/legacy/psammead'],
      ['#models', './src/app/models'],
      ['#pages', './src/app/pages'],
      ['#testHelpers', './src/testHelpers'],
      ['#server', './src/server'],
      ['#storybook', './.storybook'],
      ['#cypress', './cypress'],
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
};
