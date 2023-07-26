import '@testing-library/jest-dom/extend-expect';
import chalk from 'chalk';

// Errors
const REACT_FAILED_PROP_TYPE = 'Failed prop';
const REACT_NO_KEYS = 'Each child in a list should have a unique "key" prop';
const REACT_DUPLICATE_KEYS = 'Encountered two children with the same key';
const REACT_DOM_RENDER = 'ReactDOM.render is no longer supported in React 18';
const REACT_STATE_UPDATES_WRAPPED_IN_ACT =
  'When testing, code that causes React state updates should be wrapped into act';
const WEB_VITALS_NO_PAGE_TYPE = 'Web Vitals: No page type to report';

const REACT_ERRORS = [
  REACT_FAILED_PROP_TYPE,
  REACT_NO_KEYS,
  REACT_DUPLICATE_KEYS,
  REACT_DOM_RENDER,
  REACT_STATE_UPDATES_WRAPPED_IN_ACT,
  WEB_VITALS_NO_PAGE_TYPE,
];

// Warnings
const REACT_PSEUDO_CLASS_FIRST_CHILD = 'The pseudo class ":first-child"';
const REACT_PSEUDO_CLASS_NTH_CHILD = 'The pseudo class ":nth-child"';
const REACT_UNMATCHED_GET = 'Unmatched GET to /undefined';
const REACT_UNMOUNTED = 'React state update on an unmounted component';

const REACT_SUPPRESSED_WARNINGS = [
  REACT_PSEUDO_CLASS_FIRST_CHILD,
  REACT_PSEUDO_CLASS_NTH_CHILD,
  REACT_UNMATCHED_GET,
  REACT_UNMOUNTED,
];

const REACT_ERRORS_REGEX = new RegExp(REACT_ERRORS.join('|'));
const REACT_SUPPRESSED_REGEX = new RegExp(REACT_SUPPRESSED_WARNINGS.join('|'));

const { error, warn } = console;

const getFormattedMessage = (message, rest) => {
  let theMessage = message;

  if (typeof message === 'object') {
    theMessage = message.toString();
  }

  return theMessage.replace('%s', rest);
};

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

      const consoleFormattedMessage = getFormattedMessage(message, rest);

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

  const formattedMessage = getFormattedMessage(message, rest);

  if (REACT_ERRORS_REGEX.test(formattedMessage)) {
    throw new Error(
      [
        chalk.red.bold(
          `
${expect.getState().testPath}: ${expect.getState().currentTestName}
          
Please fix the following:
`,
        ),
        chalk.red(formattedMessage),
      ].join('\n'),
    );
  }

  error(message, ...rest);
};

global.setImmediate =
  global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));

// eslint-disable-next-line no-console
console.warn = (message, ...rest) => {
  if (didSuppressWarning(message, ...rest)) return;
  warn(message, ...rest);
};
