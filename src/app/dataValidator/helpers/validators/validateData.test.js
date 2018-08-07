global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const { validateData } = require('./validateData');

const validData = require('../../../../../data/scenario-01.json');
const invalidData = require('../../../../../data/scenario-23.json');

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
