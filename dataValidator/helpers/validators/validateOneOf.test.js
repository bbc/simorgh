// global.console.log = jest.fn(); // silence console.log during jest tests

const { validateOneOf } = require('./validateOneOf');
const { getAllSchemas } = require('../interpretSchema/getAllSchemas');
const data = require('../../../data/test/news/articles/c0000000001o.json');

const schemas = getAllSchemas();
const referencedItems = schemas.blocks.items.oneOf;
const parentSchemaName = ':article:model:blocks';

describe('validate oneOf', () => {
  it('should not error on valid oneOf block', () => {
    const headlineBlock = data.content.model.blocks[0];

    expect(() => {
      validateOneOf(referencedItems, headlineBlock, parentSchemaName);
    }).not.toThrowError();
  });

  it('should error on invalid oneOf block', () => {
    data.content.model.blocks[0].type = 'randomBlock';
    const randomBlock = data.content.model.blocks[0];

    expect(() => {
      validateOneOf(referencedItems, randomBlock, parentSchemaName);
    }).toThrowError(
      'Error: the data contained randomBlock which is not a valid child of :article:model:blocks',
    );
  });
});
