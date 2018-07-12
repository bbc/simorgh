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

    expect(() => {
      validateRequired(schema.required, data);
    }).toThrowError('Error: Missing required prop for locator');
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

    expect(() => {
      validateRequired(schema.required, dataWithLocator);
    }).toThrowError('Error: Missing required prop for passport');
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

    expect(() => {
      validateRequired(schema.required, requiredData);
    }).not.toThrowError();
  });
});
