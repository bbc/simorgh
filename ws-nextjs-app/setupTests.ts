global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
