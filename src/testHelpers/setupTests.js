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

let reactErrorsCountPerTestSuite = 0;
const reactErrorsLimitPerTestSuite = 6; // The goal is to have zero React errors per suite so keep fixing errors and lowering this limit

// eslint-disable-next-line no-console
console.error = (message, ...rest) => {
  if (REACT_ERRORS_REGEX.test(message)) {
    reactErrorsCountPerTestSuite += 1;

    if (reactErrorsCountPerTestSuite > reactErrorsLimitPerTestSuite) {
      throw new Error(
        [
          chalk.red.bold(
            'Test failed because too many React warnings were detected. Please fix the following:',
          ),
          chalk.red(message),
        ].join('\n'),
      );
    }
  }

  error(message, ...rest);
};
