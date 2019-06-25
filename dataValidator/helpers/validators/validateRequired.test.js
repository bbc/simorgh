global.console.log = jest.fn(); // silence console.log during jest tests

const { validateRequired } = require('./validateRequired');

describe('Data Validator', () => {
  it('should throw error when data does not have a required property', () => {
    const schema = {
      required: ['locator', 'passport', 'model'],
      type: 'article',
      properties: {},
    };
    const data = {
      type: 'article',
    };
    const schemaName = 'article';

    expect(() => {
      validateRequired(schema.required, data, schemaName);
    }).toThrowError(`Error: Missing required property 'locator' for 'article'`);
  });

  it('should loop through all items of the required array and throw error when a required property is missing', () => {
    const schema = {
      required: ['locator', 'passport', 'model'],
      type: 'article',
      properties: {},
    };
    const dataWithLocator = {
      type: 'article',
      locator: 'urn:bbc:optimo:asset:c0000000001o',
    };
    const schemaName = 'article';

    expect(() => {
      validateRequired(schema.required, dataWithLocator, schemaName);
    }).toThrowError(
      `Error: Missing required property 'passport' for 'article'`,
    );
  });

  it('should not error when data does have all required properties', () => {
    const requiredData = {
      type: 'article',
      passport: {},
      locator: {},
      model: {},
    };
    const schema = {
      required: ['locator', 'passport', 'model'],
      type: 'article',
    };
    const schemaName = 'article';

    expect(() => {
      validateRequired(schema.required, requiredData, schemaName);
    }).not.toThrowError();
  });
});
