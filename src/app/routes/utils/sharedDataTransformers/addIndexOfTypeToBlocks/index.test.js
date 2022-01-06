import addIndexOfTypeToBlocks from '.';

const fixture = {
  content: {
    model: {
      blocks: [
        {
          type: 'bulleted-list',
          model: {
            blocks: [
              {
                type: 'bulleted-list',
              },
            ],
          },
        },
        {
          type: 'paragraph',
        },
        {
          type: 'bulleted-list',
        },
      ],
    },
  },
};

describe('addIndexOfTypeToBlocks', () => {
  it('should add ids to all items without ids', () => {
    const actual = addIndexOfTypeToBlocks(fixture);

    expect(actual).toEqual({
      content: {
        model: {
          blocks: [
            {
              type: 'bulleted-list',
              indexOfBlockType: 1,
            },
            {
              type: 'paragraph',
              indexOfBlockType: 1,
            },
            {
              type: 'bulleted-list',
              indexOfBlockType: 2,
            },
          ],
        },
      },
    });
  });
});
