import chalk from 'chalk';

const REACT_FAILED_PROP_TYPE = 'Failed prop type';
const REACT_DUPLICATE_KEYS = 'Encountered two children with the same key';
const REACT_ERRORS = [REACT_FAILED_PROP_TYPE, REACT_DUPLICATE_KEYS];
const REACT_ERRORS_REGEX = new RegExp(REACT_ERRORS.join('|'), 'gi');

const { error } = console;

let reactErrorsCountPerTestSuite = 0;
const reactErrorsLimitPerTestSuite = 3;

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
