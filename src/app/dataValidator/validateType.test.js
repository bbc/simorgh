const { validateType } = require('./validateType');

const data = {
  type: 'article',
};

describe('Validate type', () => {
  it('should throw an error when schema type and data type do not match', () => {
    const schemaType = 'string';

    expect(() => {
      validateType(schemaType, data);
    }).toThrowError(
      'Error: Type does not match for article node - expected string got object',
    );
  });

  it('should not error when schema type and data type match', () => {
    const schemaType = 'object';

    expect(() => {
      validateType(schemaType, data);
    }).not.toThrowError();
  });
});
