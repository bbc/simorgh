global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const { getSchemaByName } = require('./getSchemaByName');

describe('Get schema by name helper', () => {
  it('should error when schema does not exist', () => {
    const invalidSchemaName = 'ich';

    expect(() => {
      getSchemaByName(invalidSchemaName);
    }).toThrowError(`Error: No schema exists for the block 'ich'`);
  });

  it('should error when schema does not exist', () => {
    const validSchemaName = 'article';

    expect(() => {
      getSchemaByName(validSchemaName);
    }).not.toThrowError();
  });
});
