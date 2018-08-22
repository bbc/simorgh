global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const { validateData } = require('./validateData');

const validData = require('../../../../../data/c0000000001o.json');
const invalidData = require('../../../../../data/c0000000023o.json');

describe('Data Validator', () => {
  it('should not error on validateData', () => {
    expect(() => {
      validateData(validData);
    }).not.toThrowError();
  });

  it('should error on invalid data scenario', () => {
    expect(() => {
      validateData(invalidData);
    }).toThrowError();
  });
});
