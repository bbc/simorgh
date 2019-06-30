import { textBlock as modelTextBlock } from '../../../src/app/models/blocks';

global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const validateNode = require('./validateNode');
const { getAllSchemas } = require('../interpretSchema/getAllSchemas');
const data = require('../../../data/news/articles/c0000000001o.json');

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
      `Error: Type does not match for ':article:locator' - expected 'string' for: {}`,
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
              anArray: {
                type: 'array',
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
        anArray: [],
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
    const articleBlocks = articleContent.model.blocks;
    const headlineBlock = articleBlocks[0];
    const headlineBlocks = headlineBlock.model.blocks;
    const textBlock = headlineBlocks[0];
    const textBlocks = textBlock.model.blocks;
    const paragraphBlock = textBlocks[0];
    const paragraphBlocks = paragraphBlock.model.blocks;
    const fragmentBlock = paragraphBlocks[0];
    const fragmentAttrs = fragmentBlock.model.attributes;
    const textBlock2 = articleBlocks[1];
    const textBlocks2 = textBlock2.model.blocks;
    const paragraphBlock2 = textBlocks2[0];
    const paragraphBlocks2 = paragraphBlock2.model.blocks;
    const fragmentBlock2 = paragraphBlocks2[0];
    const fragmentAttrs2 = fragmentBlock2.model.attributes;

    validateNode.validateBlock(data, 'article');

    // prettier-ignore
    expect(validateBlockSpy.mock.calls).toEqual([
      [data,              'article'],
      [articleBlocks,     'blocks',         ':article:content:model'],
      [headlineBlock,     'headline',       ':article:content:model:blocks'],
      [headlineBlocks,    'blocks',         ':article:content:model:blocks:headline:model'],
      [textBlock,         'text',           ':article:content:model:blocks:headline:model:blocks'],
      [textBlocks,        'blocks',         ':article:content:model:blocks:headline:model:blocks:text:model'],
      [paragraphBlock,    'paragraph',      ':article:content:model:blocks:headline:model:blocks:text:model:blocks'],
      [paragraphBlocks,   'blocks',         ':article:content:model:blocks:headline:model:blocks:text:model:blocks:paragraph:model'],
      [fragmentBlock,     'fragment',       ':article:content:model:blocks:headline:model:blocks:text:model:blocks:paragraph:model:blocks'],
      [fragmentAttrs,     'fragmentAttrs',  ':article:content:model:blocks:headline:model:blocks:text:model:blocks:paragraph:model:blocks:fragment:model'],
      [textBlock2,        'text',           ':article:content:model:blocks'],
      [textBlocks2,       'blocks',         ':article:content:model:blocks:text:model'],
      [paragraphBlock2,   'paragraph',      ':article:content:model:blocks:text:model:blocks'],
      [paragraphBlocks2,  'blocks',         ':article:content:model:blocks:text:model:blocks:paragraph:model'],
      [fragmentBlock2,    'fragment',       ':article:content:model:blocks:text:model:blocks:paragraph:model:blocks'],
      [fragmentAttrs2,    'fragmentAttrs',  ':article:content:model:blocks:text:model:blocks:paragraph:model:blocks:fragment:model'],
    ]);
    // The prettier ignore finishes here - https://prettier.io/docs/en/ignore.html
  });

  it('should recursively validate all levels of the tree', () => {
    const validateNodeSpy = jest.spyOn(validateNode, 'validateNode');

    validateNode.validateBlock(data, 'article');

    expect(validateNodeSpy).toHaveBeenCalledTimes(67);
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
