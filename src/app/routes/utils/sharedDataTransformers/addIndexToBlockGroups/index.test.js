import addIndexToBlockGroups from '.';

describe('addIndexToBlockGroups', () => {
  it('should add blockGroupIndex and blockGroupType to top level block groups if predicate function that tests the top level block returns true', () => {
    const blockGroup = {
      content: {
        model: {
          blocks: [
            {
              type: 'orderedList',
            },
            {
              type: 'paragraph',
            },
            {
              type: 'orderedList',
            },
            {
              type: 'paragraph',
            },
          ],
        },
      },
    };
    const isOrderedList = ({ type }) => type === 'orderedList';
    const actual = addIndexToBlockGroups(isOrderedList, {
      blockGroupType: 'specialListBlock',
    })(blockGroup);

    expect(actual).toEqual({
      content: {
        model: {
          blocks: [
            {
              type: 'orderedList',
              blockGroupIndex: 1,
              blockGroupType: 'specialListBlock',
            },
            {
              type: 'paragraph',
            },
            {
              type: 'orderedList',
              blockGroupIndex: 2,
              blockGroupType: 'specialListBlock',
            },
            {
              type: 'paragraph',
            },
          ],
        },
      },
    });
  });

  it('should add blockGroupIndex and blockGroupType to child blocks of top level block groups (using pathToBlockGroup option) if predicate function that tests the top level block returns true', () => {
    const blockGroup = {
      content: {
        model: {
          blocks: [
            {
              type: 'orderedList',
              model: {
                blocks: [
                  {
                    type: 'listItem',
                  },
                ],
              },
            },
            {
              type: 'paragraph',
            },
            {
              type: 'orderedList',
              model: {
                blocks: [
                  {
                    type: 'listItem',
                  },
                ],
              },
            },
            {
              type: 'paragraph',
            },
          ],
        },
      },
    };
    const isOrderedList = ({ type }) => type === 'orderedList';
    const actual = addIndexToBlockGroups(isOrderedList, {
      blockGroupType: 'specialListItem',
      pathToBlockGroup: ['model', 'blocks', 0],
    })(blockGroup);

    expect(actual).toEqual({
      content: {
        model: {
          blocks: [
            {
              type: 'orderedList',
              model: {
                blocks: [
                  {
                    type: 'listItem',
                    blockGroupIndex: 1,
                    blockGroupType: 'specialListItem',
                  },
                ],
              },
            },
            {
              type: 'paragraph',
            },
            {
              type: 'orderedList',
              model: {
                blocks: [
                  {
                    type: 'listItem',
                    blockGroupIndex: 2,
                    blockGroupType: 'specialListItem',
                  },
                ],
              },
            },
            {
              type: 'paragraph',
            },
          ],
        },
      },
    });
  });

  it('should return the data unchanged if the predicate returns false', () => {
    const blockGroup = {
      content: {
        model: {
          blocks: [
            {
              type: 'orderedList',
            },
          ],
        },
      },
    };
    const isOrderedList = () => false;
    const actual = addIndexToBlockGroups(isOrderedList, {
      blockGroupType: 'specialListBlock',
    })(blockGroup);

    expect(actual).toEqual(blockGroup);
  });

  it('should return the data unchanged if the data is not valid page data structure even if the predicate returns true', () => {
    const blockGroup = {
      model: {
        blocks: [
          {
            type: 'orderedList',
          },
        ],
      },
    };
    const isOrderedList = () => true;
    const actual = addIndexToBlockGroups(isOrderedList, {
      blockGroupType: 'specialListBlock',
    })(blockGroup);

    expect(actual).toEqual(blockGroup);
  });

  it('should return the data unchanged if the data is not valid page data structure and if the predicate returns false', () => {
    const blockGroup = {
      model: {
        blocks: [
          {
            type: 'orderedList',
          },
        ],
      },
    };
    const isOrderedList = () => false;
    const actual = addIndexToBlockGroups(isOrderedList, {
      blockGroupType: 'specialListBlock',
    })(blockGroup);

    expect(actual).toEqual(blockGroup);
  });

  it('should return the data unchanged if predicate returns true but pathToBlockGroup does not exist', () => {
    const blockGroup = {
      content: {
        model: {
          blocks: [
            {
              type: 'orderedList',
            },
          ],
        },
      },
    };
    const isOrderedList = () => true;
    const actual = addIndexToBlockGroups(isOrderedList, {
      blockGroupType: 'specialListBlock',
      pathToBlockGroup: ['model', 'blocks', 0],
    })(blockGroup);

    expect(actual).toEqual(blockGroup);
  });

  it('should throw an error if no predicate function provided', () => {
    const blockGroup = {
      content: {
        model: {
          blocks: [
            {
              type: 'orderedList',
            },
          ],
        },
      },
    };

    expect(() => {
      addIndexToBlockGroups(undefined, {
        blockGroupType: 'specialListBlock',
      })(blockGroup);
    }).toThrow();
  });

  it('should throw an error if no blockGroupType is provided', () => {
    const blockGroup = {
      content: {
        model: {
          blocks: [
            {
              type: 'orderedList',
            },
          ],
        },
      },
    };

    expect(() => {
      addIndexToBlockGroups(() => true, {})(blockGroup);
    }).toThrow();
  });

  it('should throw an error if no options provided', () => {
    const blockGroup = {
      content: {
        model: {
          blocks: [
            {
              type: 'orderedList',
            },
          ],
        },
      },
    };

    expect(() => {
      addIndexToBlockGroups(() => true)(blockGroup);
    }).toThrow();
  });
});
