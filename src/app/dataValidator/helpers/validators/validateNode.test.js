import { textBlock as modelTextBlock } from '../../../models/blocks';

global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const validateNode = require('./validateNode');
const { getAllSchemas } = require('../interpretSchema/getAllSchemas');
const data = require('../../../../../data/test/news/c0000000001o.json');

const schemas = getAllSchemas();
const { article } = schemas;

describe('Validate node & properties helper', () => {
  it('should not error on validateNode', () => {
    expect(() => {
      validateNode.validateNode(article, data);
    }).not.toThrowError();
  });

  it('should not error when enum is set', () => {
    const enumSchema = {
      type: 'string',
      enum: ['analysis', 'feature', 'news'],
    };
    const enumData = 'analysis';

    expect(() => {
      validateNode.validateNode(enumSchema, enumData);
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
      validateNode.validateProperties(
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
              category: {
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
        category: 'news',
      },
    };
    const schemaName = 'article';

    expect(() => {
      validateNode.validateProperties(schema, propertyData, schemaName);
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
      validateNode.validateProperties(schema, propertyData, schemaName);
    }).not.toThrowError();
  });
});

describe('Validate block', () => {
  it('should not error on validateBlock(article)', () => {
    expect(() => {
      validateNode.validateBlock(data, 'article');
    }).not.toThrowError();
  });

  it('should not error on validateBlock(headline)', () => {
    const headlineBlock = data.content.model.blocks[0];
    expect(() => {
      validateNode.validateBlock(headlineBlock, 'headline');
    }).not.toThrowError();
  });

  it('should recursively validate all blocks', () => {
    const validateBlockSpy = jest.spyOn(validateNode, 'validateBlock');

    const articleContent = data.content;
    const articleModel = articleContent.model;
    const articleBlocks = articleModel.blocks;
    const headlineBlock = articleBlocks[0];
    const headlineModel = headlineBlock.model;
    const textBlock = headlineModel.blocks[0];
    const textModel = textBlock.model;
    const paragraphBlock = textModel.blocks[0];
    const textBlock2 = articleBlocks[1];
    const textModel2 = textBlock2.model;
    const paragraphBlock2 = textModel2.blocks[0];

    validateNode.validateBlock(data, 'article');

    // prettier-ignore
    expect(validateBlockSpy.mock.calls).toEqual([
      [data,            'article'],
      [articleModel,    'blocks',     ':article:content:model'],
      [headlineBlock,   'headline',   ':article:content:model:blocks'],
      [headlineModel,   'blocks',     ':article:content:model:blocks:headline:model'],
      [textBlock,       'text',       ':article:content:model:blocks:headline:model:blocks'],
      [textModel,       'blocks',     ':article:content:model:blocks:headline:model:blocks:text:model'],
      [paragraphBlock,  'paragraph',  ':article:content:model:blocks:headline:model:blocks:text:model:blocks'],
      [textBlock2,      'text',       ':article:content:model:blocks'],
      [textModel2,      'blocks',     ':article:content:model:blocks:text:model'],
      [paragraphBlock2, 'paragraph',  ':article:content:model:blocks:text:model:blocks'],
    ]);
    // The prettier ignore finishes here - https://prettier.io/docs/en/ignore.html
  });

  it('should recursively validate all levels of the tree', () => {
    const validateNodeSpy = jest.spyOn(validateNode, 'validateNode');

    validateNode.validateBlock(data, 'article');

    expect(validateNodeSpy).toHaveBeenCalledTimes(62);
  });

  it('handleSchemaItems: should handle null value when array expected', () => {
    const dataWithNullArray = {
      metadata: {
        tags: {
          about: null,
        },
        type: 'article',
      },
    };
    const simpleSchema = {
      type: 'object',
      properties: {
        metadata: {
          type: 'object',
          properties: {
            tags: {
              type: 'object',
              properties: {
                about: {
                  type: 'object',
                  items: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    };

    expect(() =>
      validateNode.validateNode(
        simpleSchema,
        dataWithNullArray,
        'article',
        ':article',
      ),
    ).not.toThrowError();
  });

  it('handleSchemaItems: should handle an array of blocks', () => {
    const dataWithBlocksArray = {
      model: modelTextBlock(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      ),
    };
    const simpleSchema = {
      type: 'object',
      properties: {
        blocks: {
          type: 'object',
          items: {
            oneOf: [{ $ref: '#/components/schemas/paragraph' }],
          },
        },
      },
    };

    expect(() =>
      validateNode.validateNode(
        simpleSchema,
        dataWithBlocksArray,
        'blocks',
        ':article:content:model',
      ),
    ).not.toThrowError();
  });
});
