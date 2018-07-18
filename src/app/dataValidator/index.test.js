global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const { validateData } = require('./index');
const data = require('../../../data/scenario-01.json');

describe('Data Validator', () => {
  it('should not error on validateData', () => {
    expect(() => {
      validateData(data);
    }).not.toThrowError();
  });
});
