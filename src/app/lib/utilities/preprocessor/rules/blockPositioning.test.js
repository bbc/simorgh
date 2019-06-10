import deepClone from '../../../../helpers/json/deepClone';
import applyBlockPositioning from './blockPositioning';

const standardObject = {
  foo: 'bar',
};

const singleBlock = {
  content: {
    model: {
      blocks: [deepClone(standardObject)],
    },
  },
};

const nestedBlocks = {
  content: {
    model: {
      blocks: [
        {
          model: {
            blocks: [deepClone(standardObject), deepClone(standardObject)],
          },
        },
      ],
    },
  },
};

describe('Block positioning rules', () => {
  it('does not add block positioning to a standard object', () => {
    expect(applyBlockPositioning(standardObject)).toEqual(standardObject);
  });

  it('adds block position to a single block', () => {
    const expectedOutput = deepClone(singleBlock);

    expectedOutput.content.model.blocks[0].pos = [1];
    expect(applyBlockPositioning(singleBlock)).toEqual(expectedOutput);
  });

  it('adds block position to nested blocks', () => {
    const expectedOutput = deepClone(nestedBlocks);

    expectedOutput.content.model.blocks[0].pos = [1];
    expectedOutput.content.model.blocks[0].model.blocks[0].pos = [1, 1];
    expectedOutput.content.model.blocks[0].model.blocks[1].pos = [1, 2];
    expect(applyBlockPositioning(nestedBlocks)).toEqual(expectedOutput);
  });
});
