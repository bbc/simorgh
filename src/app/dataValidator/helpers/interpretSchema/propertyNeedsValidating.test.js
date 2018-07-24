const { propertyNeedsValidating } = require('./propertyNeedsValidating');

describe('Property needs validating', () => {
  it('should validate required properties', () => {
    const schema = {
      type: 'object',
      required: ['locator'],
      properties: {
        locator: {
          type: 'sting',
        },
      },
    };
    const data = {};
    const property = 'locator';

    expect(propertyNeedsValidating(schema, data, property)).toEqual(true);
  });

  it('should validate optional properties if data has the property AND also has no required properties', () => {
    const schema = {
      type: 'object',
      properties: {
        seoHeadline: {
          type: 'sting',
        },
      },
    };
    const data = {
      seoHeadline: 'Some search friendly headline',
    };
    const property = 'seoHeadline';

    expect(propertyNeedsValidating(schema, data, property)).toEqual(true);
  });

  it('should not validate optional properties if data does not have property AND also has no required properties', () => {
    const schema = {
      type: 'object',
      properties: {
        seoHeadline: {
          type: 'sting',
        },
      },
    };
    const data = {};
    const property = 'seoHeadline';

    expect(propertyNeedsValidating(schema, data, property)).toEqual(false);
  });

  it('should not validate current properties if not in required AND data does not have property', () => {
    const schema = {
      type: 'object',
      required: ['locator'],
      properties: {
        locator: 'urn:bbc:optimo:asset:c0000000001o',
      },
    };
    const data = {};
    const property = 'seoHeadline';

    expect(propertyNeedsValidating(schema, data, property)).toEqual(false);
  });

  it('should not validate if no required set AND data does not have property', () => {
    const schema = {
      type: 'object',
      properties: {
        locator: 'urn:bbc:optimo:asset:c0000000001o',
      },
    };
    const data = {};
    const property = 'seoHeadline';

    expect(propertyNeedsValidating(schema, data, property)).toEqual(false);
  });
});
