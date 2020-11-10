import 'jest-styled-components';
import '@testing-library/jest-dom/extend-expect';
import chalk from 'chalk';

const REACT_FAILED_PROP_TYPE = 'Failed prop type';
const REACT_NO_KEYS = 'Each child in a list should have a unique "key" prop';
const REACT_DUPLICATE_KEYS = 'Encountered two children with the same key';
const REACT_ERRORS = [
  REACT_FAILED_PROP_TYPE,
  REACT_NO_KEYS,
  REACT_DUPLICATE_KEYS,
];
const REACT_ERRORS_REGEX = new RegExp(REACT_ERRORS.join('|'));

const { error } = console;

const didSuppressWarning = message => {
  const { expectedWarnings } = window;
  if (expectedWarnings && Array.isArray(expectedWarnings)) {
    for (let i = 0; i < expectedWarnings.length; i += 1) {
      const warningsRegex = new RegExp(
        [REACT_FAILED_PROP_TYPE, ...expectedWarnings[i]].join('.*'),
      );
      if (warningsRegex.test(message)) {
        window.expectedWarnings.splice(i, 1);
        return true;
      }
    }
  }
  return false;
};

// eslint-disable-next-line no-console
console.error = (message, ...rest) => {
  if (didSuppressWarning(message)) return;

  if (REACT_ERRORS_REGEX.test(message)) {
    throw new Error(
      [
        chalk.red.bold(
          'Test failed because a React warning was detected. Please fix the following:',
        ),
        chalk.red(message),
      ].join('\n'),
    );
  }

  error(message, ...rest);
};
