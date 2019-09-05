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

let TEST_SUITE_HAS_REACT_ERROR = false;
let errors = [];

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
    TEST_SUITE_HAS_REACT_ERROR = true;
    errors.push([message, ...rest, '\n\n']);
  }

  // error(message, ...rest);
};

beforeAll(() => {
  TEST_SUITE_HAS_REACT_ERROR = false;
  errors = [];
});

afterAll(() => {
  if (TEST_SUITE_HAS_REACT_ERROR) {
    throw new Error(
      [
        chalk.red.bold(
          'Test suite failed because a React warning(s) was detected.',
        ),
        errors.map(err => chalk.red(...err)),
      ].join('\n'),
    );
  }
});
