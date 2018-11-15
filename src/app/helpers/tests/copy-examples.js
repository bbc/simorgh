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

BabelRegister({
  extensions: ['.jsx'],
});

const testsDir = path.resolve(__dirname, '../__tests__');
const components = ['InlineLink'];

// clear dir
fs.removeSync(testsDir);
fs.mkdirSync(testsDir);

components.forEach(componentName => {
  const componentDir = path.resolve(
    __dirname,
    `../../components/${componentName}`,
  );
  const examples = require(`${componentDir}/index.examples.jsx`).default; // eslint-disable-line

  // copy snapshots
  fs.copySync(
    `${componentDir}/__snapshots__`,
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
