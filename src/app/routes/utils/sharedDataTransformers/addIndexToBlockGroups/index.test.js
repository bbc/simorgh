import addIndexToBlockGroups from '.';

describe('addIndexToBlockGroups', () => {
  it('should add blockGroupIndex and blockGroupType to top level block groups if predicate function that tests the top level block returns true', () => {
    const blockGroup = {
      content: {
        model: {
          blocks: [
            {
              type: 'foo',
            },
            {
              type: 'bar',
            },
            {
              type: 'foo',
            },
            {
              type: 'bar',
            },
          ],
        },
      },
    };
    const predicate = ({ type }) => type === 'foo';
    const actual = addIndexToBlockGroups(predicate, {
      blockGroupType: 'fooBlockGroup',
    })(blockGroup);

    expect(actual).toEqual({
      content: {
        model: {
          blocks: [
            {
              type: 'foo',
              blockGroupIndex: 1,
              blockGroupType: 'fooBlockGroup',
            },
            {
              type: 'bar',
            },
            {
              type: 'foo',
              blockGroupIndex: 2,
              blockGroupType: 'fooBlockGroup',
            },
            {
              type: 'bar',
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
              type: 'foo',
              model: {
                blocks: [
                  {
                    type: 'baz',
                  },
                ],
              },
            },
            {
              type: 'bar',
            },
            {
              type: 'foo',
              model: {
                blocks: [
                  {
                    type: 'baz',
                  },
                ],
              },
            },
            {
              type: 'bar',
            },
          ],
        },
      },
    };
    const predicate = ({ type }) => type === 'foo';
    const actual = addIndexToBlockGroups(predicate, {
      blockGroupType: 'fooBazBlockGroup',
      pathToBlockGroup: ['model', 'blocks', 0],
    })(blockGroup);

    expect(actual).toEqual({
      content: {
        model: {
          blocks: [
            {
              type: 'foo',
              model: {
                blocks: [
                  {
                    type: 'baz',
                    blockGroupIndex: 1,
                    blockGroupType: 'fooBazBlockGroup',
                  },
                ],
              },
            },
            {
              type: 'bar',
            },
            {
              type: 'foo',
              model: {
                blocks: [
                  {
                    type: 'baz',
                    blockGroupIndex: 2,
                    blockGroupType: 'fooBazBlockGroup',
                  },
                ],
              },
            },
            {
              type: 'bar',
            },
          ],
        },
      },
    });
  });
});
