import '@testing-library/jest-dom/extend-expect';

global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
