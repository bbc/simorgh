const dataValidator = require('./dataValidator');

const dataArticleWrapper = {
  type: 'article',
};

describe('Data Validator', () => {
  describe('error checking', () => {
    it('should throw an error when schema type and data type do not match', () => {
      const schemaType = 'string';

      expect(() => {
        dataValidator.validateType(schemaType, dataArticleWrapper);
      }).toThrowError(
        'Error: Type does not match for article node - expected string got object',
      );
    });

    it('should throw an error when data node is not in schema enum definition', () => {
      const enumData = 'shorthand';
      const schemaEnumArray = ['analysis', 'feature', 'news'];

      expect(() => {
        dataValidator.validateEnum(schemaEnumArray, enumData);
      }).toThrowError(
        'Error: Type does not exist in enum array for shorthand node - expected values [analysis,feature,news] got shorthand',
      );
    });

    it('should throw error when data does not have a required property', () => {
      const schema = {
        required: ['locator', 'passport', 'model'],
        type: 'article',
        properties: {},
      };

      expect(() => {
        dataValidator.validateRequired(schema.required, dataArticleWrapper);
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
        dataValidator.validateRequired(schema.required, dataWithLocator);
      }).toThrowError('Error: Missing required prop for passport');
    });

    it('should loop properties and error if type does not match', () => {
      const schema = {
        locator: {
          type: 'string',
        },
      };
      const data = {
        locator: {},
      };

      expect(() => {
        dataValidator.validateProperties(schema, data);
      }).toThrowError(
        `Error: Type does not match for undefined node - expected string got object`,
      );
    });
  });

  describe('logic checking', () => {
    it('should not error when schema type and data type match', () => {
      const schemaType = 'object';

      expect(() => {
        dataValidator.validateType(schemaType, dataArticleWrapper);
      }).not.toThrowError();
    });

    it('should not error when data node is in schema enum definition', () => {
      const enumData = 'news';
      const schemaEnumArray = ['analysis', 'feature', 'news'];

      expect(() => {
        dataValidator.validateEnum(schemaEnumArray, enumData);
      }).not.toThrowError();
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
        dataValidator.validateRequired(schema.required, requiredData);
      }).not.toThrowError();
    });
  });
});
