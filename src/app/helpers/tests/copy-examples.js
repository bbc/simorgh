/* eslint-disable import/no-extraneous-dependencies */
/**
 * NB, had to install `esm` to get import working, and then
 * had to import babel-register to get JSX working.
 * @TODO: could uninstall esm and use babel-register for all?
 */
import BabelRegister from 'babel-register';
import path from 'path';
import fs from 'fs-extra';
import jsxToString from 'jsx-to-string';
import requireContext from 'require-context'; // can't use Webpack's one

BabelRegister({
  extensions: ['.jsx'],
});

const componentsDir = path.resolve(__dirname, `../../components/`);
const testsDir = path.resolve(__dirname, '../__tests__');
const componentDirs = requireContext(componentsDir, true, /\.examples\.jsx$/);
const components = componentDirs
  .keys()
  .map(filepath => filepath.match(/(.+)\/index\.examples\.jsx$/)[1]);

// clear dir
fs.removeSync(testsDir);
fs.mkdirSync(testsDir);

components.forEach(componentName => {
  // eslint-disable-next-line
  const examples = require(`${componentsDir}/${componentName}/index.examples.jsx`)
    .default;

  // copy snapshots
  fs.copySync(
    `${componentsDir}/${componentName}/__snapshots__`,
    `${testsDir}/${componentName}/__snapshots__/`,
  );

  const snapshots = examples.reduce(
    (str, example) => `${str}
    shouldMatchSnapshot(
      '${example.description}',
      ${jsxToString(example.render)},
    );
  `,
    '',
  );

  console.log('snapshots:', snapshots);

  // generate test
  fs.writeFileSync(
    `${testsDir}/${componentName}/index.test.jsx`,
    `
    import React from 'react';
    import ${componentName} from '../../../components/${componentName}';
    import { shouldMatchSnapshot } from '../../tests/testHelpers';

    describe('${componentName}', () => {
      ${snapshots}
    });
    `,
    { encoding: 'utf8' },
  );
});
