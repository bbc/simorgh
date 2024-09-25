import colours from 'colors';
import '@testing-library/jest-dom';

// Errors
const FAILED_PROP = 'Failed prop';

// Warnings
const PSEUDO_CLASS_FIRST_CHILD = 'The pseudo class ":first-child"';
const PSEUDO_CLASS_NTH_CHILD = 'The pseudo class ":nth-child"';
const UNMATCHED_GET = 'Unmatched GET to /undefined';
const REACT_UNMOUNTED = 'React state update on an unmounted component';
const TAG_HUNDEFINED = 'The tag <hundefined';

const SUPPRESSED_WARNINGS = [
  PSEUDO_CLASS_FIRST_CHILD,
  PSEUDO_CLASS_NTH_CHILD,
  UNMATCHED_GET,
  REACT_UNMOUNTED,
  TAG_HUNDEFINED,
];

const SUPPRESSED_REGEX = new RegExp(SUPPRESSED_WARNINGS.join('|'));

const { warn } = console;

const getFormattedMessage = (message, rest) => {
  let theMessage = message;

  if (typeof message === 'object') {
    if (message?.stack) {
      theMessage = message?.stack.toString();
    } else theMessage = JSON.stringify(message);
  }

  return theMessage.replace('%s', rest);
};

const didSuppressWarning = (message, ...rest) => {
  const { expectedWarnings } = window;
  if (SUPPRESSED_REGEX.test(message)) {
    return true;
  }
  if (expectedWarnings && Array.isArray(expectedWarnings)) {
    for (let i = 0; i < expectedWarnings.length; i += 1) {
      const warningsRegex = new RegExp(
        [FAILED_PROP, ...expectedWarnings[i]].join('*.*'),
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

  throw new Error(
    [
      colours.red.bold(
        `
${expect.getState().testPath}: ${expect.getState().currentTestName}
          
Please fix the following:
`,
      ),
      colours.red(formattedMessage),
    ].join('\n'),
  );
};

global.setImmediate =
  global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));

// eslint-disable-next-line no-console
console.warn = (message, ...rest) => {
  if (didSuppressWarning(message, ...rest)) return;
  warn(message, ...rest);
};
