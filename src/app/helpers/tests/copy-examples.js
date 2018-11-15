/* eslint-disable import/no-extraneous-dependencies */
/**
 * NB, had to install `esm` to get import working, and then
 * had to import babel-register to get JSX working.
 * @TODO: could uninstall esm and use babel-register for all?
 */
import React from 'react';
import BabelRegister from 'babel-register';
import path from 'path';
import fs from 'fs-extra';
import jsxToString from 'jsx-to-string';
import requireContext from 'require-context'; // can't use Webpack's one

BabelRegister({
  extensions: ['.jsx'],
});

const avoidTranspile = input =>
  React.isValidElement(input) ? jsxToString(input) : input;

const componentsDir = path.resolve(__dirname, `../../components/`);
const testsDir = path.resolve(__dirname, '../__tests__');
const componentDirs = requireContext(componentsDir, true, /examples\.jsx$/);
const components = componentDirs.keys();

// clear dir
fs.removeSync(testsDir);
fs.mkdirSync(testsDir);

components.forEach(componentPath => {
  const componentName = componentPath.match(/(.+)\/examples\.jsx$/)[1];

  // eslint-disable-next-line
  const examples = require(`${componentsDir}/${componentName}/examples.jsx`)
    .default;

  // copy snapshots
  fs.copySync(
    `${componentsDir}/${componentName}/__snapshots__`,
    `${testsDir}/${componentName}/__snapshots__/`,
  );

  const assertions = examples.reduce((str, example) => {
    if (example.validate) {
      // manual validate callback method applies:
      return `${str}
      {
        const validationFunction = ${example.validate};
        it('${example.description}', () => {
          const renderedComponent = renderer.create(${avoidTranspile(
            example.render,
          )}).toJSON();
          expect(validationFunction(renderedComponent)).toBeTruthy();
        });
      }
      `;
    }
    return `${str}
    shouldMatchSnapshot(
      '${example.description}',
      ${avoidTranspile(example.render)},
    );`;
  }, '');

  const importComponentDependencies = examples
    .filter(example => example.dependencies)
    .reduce(
      (dependenciesObj, example) =>
        Object.assign(dependenciesObj, example.dependencies),
      {},
    );
  const importComponentDependenciesString = Object.keys(
    importComponentDependencies,
  ).reduce(
    (importStrings, dependency) => `${importStrings}
        import ${dependency} from '${path.resolve(
      `${componentsDir}/${componentPath}`,
      `../${importComponentDependencies[dependency]}`,
    )}';`,
    '',
  );

  // generate test
  fs.writeFileSync(
    `${testsDir}/${componentName}/index.test.jsx`,
    `
    import React from 'react';
    import renderer from 'react-test-renderer';
    import { shouldMatchSnapshot } from '../../tests/testHelpers';
    import ${componentName} from '../../../components/${componentName}';
    ${importComponentDependenciesString}

    describe('${componentName}', () => {
      ${assertions}
    });
    `,
    { encoding: 'utf8' },
  );
});
