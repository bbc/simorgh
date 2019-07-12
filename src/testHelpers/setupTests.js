import chalk from 'chalk';

const REACT_FAILED_PROP_TYPE = 'Failed prop type';
const REACT_DUPLICATE_KEYS = 'Encountered two children with the same key';
const REACT_ERRORS = [REACT_FAILED_PROP_TYPE, REACT_DUPLICATE_KEYS];
const REACT_ERRORS_REGEX = new RegExp(REACT_ERRORS.join('|'), 'gi');

const { error } = console;

const FAIL_TESTS_ON_REACT_WARNINGS = true;

// eslint-disable-next-line no-console
console.error = (message, ...rest) => {
  if (REACT_ERRORS_REGEX.test(message)) {
    if (FAIL_TESTS_ON_REACT_WARNINGS) {
      // eslint-disable-next-line no-console
      console.log(
        [
          chalk.red.bold(
            `IMPORTANT! Soon this test will not pass because React warnings were detected. Please don't add any more tests containing React warnings`,
          ),
          chalk.red(message),
        ].join('\n'),
      );
    } else {
      throw new Error(
        [
          chalk.red.bold(
            'Test failed because React warnings were detected. Please fix the following:',
          ),
          chalk.red(message),
        ].join('\n'),
      );
    }
  }

  error(message, ...rest);
};
