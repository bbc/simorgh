global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const data = require('../../../../../data/test/scenario-01.json');
const { validateBlock } = require('./validateBlock');

describe('Data Validator', () => {
  it('should not error on validateBlock(article)', () => {
    expect(() => {
      validateBlock(data);
    }).not.toThrowError();
  });

  it('should not error on validateBlock(headline)', () => {
    const headlineBlock = data.model.blocks[0];
    expect(() => {
      validateBlock(headlineBlock);
    }).not.toThrowError();
  });

  it('should error when schema does not exist', () => {
    const dataWithBadType = {
      type: 'ich',
    };
    expect(() => {
      validateBlock(dataWithBadType);
    }).toThrowError('Error: No schema exists for the block ich');
  });
});
