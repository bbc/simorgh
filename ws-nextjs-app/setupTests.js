import '@testing-library/jest-dom/extend-expect';

global.setImmediate = jest.useRealTimers;

global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
