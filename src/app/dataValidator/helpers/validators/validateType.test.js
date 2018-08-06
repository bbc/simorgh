global.console.log = jest.fn(); // silence console.log during jest tests

const { validateType } = require('./validateType');

const data = {
  type: 'article',
};
const schemaName = 'article';

describe('Validate type', () => {
  it('should throw an error when schema type and data type do not match', () => {
    const schemaType = 'string';

    expect(() => {
      validateType(schemaType, data, schemaName);
    }).toThrowError(
      `Error: Type does not match for 'article' - expected 'string' got 'object'`,
    );
  });

  it('should not error when schema type and data type match', () => {
    const schemaType = 'object';

    expect(() => {
      validateType(schemaType, data, schemaName);
    }).not.toThrowError();
  });

  it('should ignore the type check of properties that have a value of null', () => {
    const schemaType = 'object';

    expect(() => {
      validateType(schemaType, null, schemaName);
    }).not.toThrowError();
  });
});
