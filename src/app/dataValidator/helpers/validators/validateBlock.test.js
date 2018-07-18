global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const data = require('../../../../../data/scenario-01.json');
const { validateBlock } = require('./validateBlock');

describe('Validate block', () => {
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
});
