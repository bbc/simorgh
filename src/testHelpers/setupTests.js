/* eslint-disable no-underscore-dangle */
import colours from 'colors';
import '@testing-library/jest-dom';

/**
 * Suppress JSDOM errors relating to navigation not implemented
 * https://github.com/jsdom/jsdom/issues/2112 -> code snippet from https://github.com/jsdom/jsdom/issues/2112#issuecomment-673540137
 *  */
if (!process.env.PUPPETEER_APP_ENV) {
  if (window?._virtualConsole) {
    const listeners = window._virtualConsole.listeners('jsdomError');
    const originalListener = listeners && listeners[0];

    window._virtualConsole.removeAllListeners('jsdomError');

    // Add a new listener to swallow JSDOM errors
    window._virtualConsole.addListener('jsdomError', error => {
      if (
        error.message !== 'Not implemented: navigation (except hash changes)' &&
        originalListener
      ) {
        originalListener(error);
      }
    });
  }
}

global.originalWindowLocation = window.location;

beforeAll(() => {
  window.location = Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(global.originalWindowLocation),
      assign: {
        configurable: true,
        value: jest.fn(),
      },
      host: {
        configurable: true,
      },
      hostname: {
        configurable: true,
      },
      href: {
        configurable: true,
      },
      origin: {
        configurable: true,
      },
      pathname: {
        configurable: true,
      },
    },
  );
});

afterAll(() => {
  // restore `window.location` to the original `jsdom` Location` object
  window.location = global.originalWindowLocation;
});

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
