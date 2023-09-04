import '@testing-library/jest-dom/extend-expect';

const REACT_FAILED_PROP_TYPE = 'Failed prop';
const REACT_NO_KEYS = 'Each child in a list should have a unique "key" prop';
const REACT_DUPLICATE_KEYS = 'Encountered two children with the same key';
const REACT_PSUEDO_CLASS = 'The pseudo class ":first-child"';
const REACT_UNMATCHED_GET = 'Unmatched GET to';
const REACT_UNMOUNTED = 'React state update on an unmounted component';
const REACT_ERRORS = [
  REACT_FAILED_PROP_TYPE,
  REACT_NO_KEYS,
  REACT_DUPLICATE_KEYS,
];
const REACT_SUPPRESSED_WARNINGS = [
  REACT_PSUEDO_CLASS,
  REACT_UNMATCHED_GET,
  REACT_UNMOUNTED,
];
const REACT_ERRORS_REGEX = new RegExp(REACT_ERRORS.join('|'));
const REACT_SUPPRESSED_REGEX = new RegExp(REACT_SUPPRESSED_WARNINGS.join('|'));

const { error, warn } = console;

const didSuppressWarning = (message, ...rest) => {
  const { expectedWarnings } = window;
  if (REACT_SUPPRESSED_REGEX.test(message)) {
    return true;
  }
  if (expectedWarnings && Array.isArray(expectedWarnings)) {
    for (let i = 0; i < expectedWarnings.length; i += 1) {
      const warningsRegex = new RegExp(
        [REACT_FAILED_PROP_TYPE, ...expectedWarnings[i]].join('*.*'),
      );
      const consoleFormattedMessage = message.replace('%s', rest);
      if (warningsRegex.test(consoleFormattedMessage)) {
        window.expectedWarnings.splice(i, 1);
        return true;
      }
    }
  }
  return false;
};

// eslint-disable-next-line no-console
console.error = (message, ...rest) => {
  if (didSuppressWarning(message, ...rest)) return;

  if (REACT_ERRORS_REGEX.test(message)) {
    throw new Error(
      [
        'Test failed because a React warning was detected. Please fix the following:',
        message,
      ].join('\n'),
    );
  }

  error(message, ...rest);
};

global.setImmediate =
  global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));

// eslint-disable-next-line no-console
console.warn = (message, ...rest) => {
  if (didSuppressWarning(message)) return;
  warn(message, ...rest);
};
