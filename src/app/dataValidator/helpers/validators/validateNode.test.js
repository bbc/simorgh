global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const {
  validateNode,
  validateProperties,
  validateBlock,
} = require('./validateNode');
const { getAllSchemas } = require('../interpretSchema/getAllSchemas');
const data = require('../../../../../data/scenario-01.json');

const schemas = getAllSchemas();
const { article } = schemas;

describe('Validate node & properties helper', () => {
  it('should not error on validateNode', () => {
    expect(() => {
      validateNode(article, data);
    }).not.toThrowError();
  });

  it('should not error when enum is set', () => {
    const enumSchema = {
      type: 'string',
      enum: ['analysis', 'feature', 'news'],
    };
    const enumData = 'analysis';

    expect(() => {
      validateNode(enumSchema, enumData);
    }).not.toThrowError();
  });

  it('should loop properties and error if type does not match', () => {
    const schema = {
      properties: {
        locator: {
          type: 'string',
        },
      },
    };
    const propertyErrorData = {
      locator: {},
    };
    const schemaName = 'article';
    const parentSchemaName = ':article';

    expect(() => {
      validateProperties(
        schema,
        propertyErrorData,
        schemaName,
        parentSchemaName,
      );
    }).toThrowError(
      `Error: Type does not match for ':article:locator' - expected 'string' got 'object'`,
    );
  });

  it('should validate nested properties correctly', () => {
    const schema = {
      properties: {
        type: 'object',
        properties: {
          passport: {
            type: 'object',
            properties: {
              language: {
                type: 'string',
              },
              home: {
                type: 'string',
              },
              articleType: {
                type: 'string',
              },
            },
          },
        },
      },
    };
    const propertyData = {
      passport: {
        language: 'en-gb',
        home: 'http://www.bbc.co.uk/ontologies/passport/home/News',
        articleType: 'news',
      },
    };
    const schemaName = 'article';

    expect(() => {
      validateProperties(schema, propertyData, schemaName);
    }).not.toThrowError();
  });

  it('should support optional properties', () => {
    const schema = {
      properties: {
        type: 'object',
        properties: {
          locator: {
            type: 'sting',
          },
        },
      },
    };
    const propertyData = {
      locator: 'urn:bjk:hello:asset:c000zk2l88wo',
    };
    const schemaName = 'article';

    expect(() => {
      validateProperties(schema, propertyData, schemaName);
    }).not.toThrowError();
  });
});

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
