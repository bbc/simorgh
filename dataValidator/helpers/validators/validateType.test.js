global.console.log = jest.fn(); // silence console.log during jest tests

const { validateType } = require('./validateType');

const data = {
  type: 'article',
};
const dataAsArray = ['key', 'value'];
const schemaName = 'article';

const shouldThrowError = (type, dataNode, nodeName, errorMsg) => {
  expect(() => {
    validateType(type, dataNode, nodeName);
  }).toThrowError(errorMsg);
};

const shouldNotThrowError = (type, dataNode, nodeName) => {
  expect(() => {
    validateType(type, dataNode, nodeName);
  }).not.toThrowError();
};

describe('Validate type', () => {
  it('should throw an error when schema type and data type do not match', () => {
    const schemaType = 'string';
    const errorMsg = `Error: Type does not match for 'article' - expected 'string' for: {"type":"article"}`;

    shouldThrowError(schemaType, data, schemaName, errorMsg);
  });

  it('should throw an error when schema type is array and data type does not match', () => {
    const schemaType = 'array';
    const errorMsg = `Error: Type does not match for 'article' - expected 'array' for: {"type":"article"}`;

    shouldThrowError(schemaType, data, schemaName, errorMsg);
  });

  it('should not error when schema type and data type match', () => {
    const schemaType = 'object';

    shouldNotThrowError(schemaType, data, schemaName);
  });

  it('should not error when schema type and data type are array', () => {
    const schemaType = 'array';

    shouldNotThrowError(schemaType, dataAsArray, schemaName);
  });

  it('should ignore the type check of properties that have a value of null', () => {
    const schemaType = 'object';

    shouldNotThrowError(schemaType, null, schemaName);
  });
});
