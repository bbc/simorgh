global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const { validateAllScenarios } = require('./index');

describe('Data Validator', () => {
  it('should not error', () => {
    expect(() => {
      validateAllScenarios();
    }).not.toThrowError();
  });
});
