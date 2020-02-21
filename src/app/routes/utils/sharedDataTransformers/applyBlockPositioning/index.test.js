import deepClone from 'ramda/src/clone';
import applyBlockPositioning from '.';

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

const contentNoModel = {
  content: standardObject,
};

const contentNoBlocks = {
  content: {
    model: standardObject,
  },
};

describe('Block positioning rules', () => {
  it('does not add block positioning to a standard object', () => {
    expect(applyBlockPositioning(standardObject)).toEqual(standardObject);
  });

  it('does not add block positioning to object with no model property', () => {
    expect(applyBlockPositioning(contentNoModel)).toEqual(contentNoModel);
  });

  it('does not add block positioning to object with no blocks', () => {
    expect(applyBlockPositioning(contentNoBlocks)).toEqual(contentNoBlocks);
  });

  it('adds block position to a single block', () => {
    const expectedOutput = deepClone(singleBlock);

    expectedOutput.content.model.blocks[0].position = [1];
    expect(applyBlockPositioning(singleBlock)).toEqual(expectedOutput);
  });

  it('adds block position to nested blocks', () => {
    const expectedOutput = deepClone(nestedBlocks);

    expectedOutput.content.model.blocks[0].position = [1];
    expectedOutput.content.model.blocks[0].model.blocks[0].position = [1, 1];
    expectedOutput.content.model.blocks[0].model.blocks[1].position = [1, 2];
    expect(applyBlockPositioning(nestedBlocks)).toEqual(expectedOutput);
  });
});
