global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const { readdirSync } = require('./readdirSync');

describe('readdirSync helper', () => {
  it('should error if directory passed to readdirSync does not exist', () => {
    expect(() => {
      readdirSync('./././data');
    }).not.toThrowError();
  });
});
