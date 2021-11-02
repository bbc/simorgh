import addIdsToItems from '.';

jest.mock('uuid', () => ({
  v4: () => 'mockId',
}));

const fixtureA = {
  content: {
    model: {
      blocks: [{}, {}, {}],
    },
  },
};

const fixtureB = {
  content: {
    model: {
      blocks: [{ id: 'id' }, { id: 'id' }, { id: 'id' }],
    },
  },
};

const fixtureC = {
  content: {
    model: {
      blocks: [
        {},
        {
          content: {
            model: {
              blocks: [
                {
                  content: {
                    model: {
                      blocks: [{}, {}, {}],
                    },
                  },
                },
                {},
                {},
              ],
            },
          },
        },
        {},
      ],
    },
  },
};

describe('addIdsToItems rule', () => {
  it('should add ids to all items without ids', () => {
    const actual = addIdsToItems({
      pathToItems: ['content', 'model', 'blocks'],
    })(fixtureA);
    const expected = {
      content: {
        model: {
          blocks: [{ id: 'mockId' }, { id: 'mockId' }, { id: 'mockId' }],
        },
      },
    };

    expect(actual).toEqual(expected);
  });

  it('should not add id to items with ids', () => {
    const actual = addIdsToItems({
      pathToItems: ['content', 'model', 'blocks'],
    })(fixtureB);
    const expected = {
      content: {
        model: { blocks: [{ id: 'id' }, { id: 'id' }, { id: 'id' }] },
      },
    };

    expect(actual).toEqual(expected);
  });

  it('should recursively add ids to items', () => {
    const actual = addIdsToItems({
      pathToItems: ['content', 'model', 'blocks'],
      recursive: true,
    })(fixtureC);
    const expected = {
      content: {
        model: {
          blocks: [
            { id: 'mockId' },
            {
              id: 'mockId',
              content: {
                model: {
                  blocks: [
                    {
                      id: 'mockId',
                      content: {
                        model: {
                          blocks: [
                            { id: 'mockId' },
                            { id: 'mockId' },
                            { id: 'mockId' },
                          ],
                        },
                      },
                    },
                    { id: 'mockId' },
                    { id: 'mockId' },
                  ],
                },
              },
            },
            { id: 'mockId' },
          ],
        },
      },
    };

    expect(actual).toEqual(expected);
  });

  it('should add id to items with with the specified prop name', () => {
    const actual = addIdsToItems({
      pathToItems: ['content', 'model', 'blocks'],
      customKeyName: 'custom',
    })(fixtureB);
    const expected = {
      content: {
        model: {
          blocks: [
            { custom: 'mockId', id: 'id' },
            { custom: 'mockId', id: 'id' },
            { custom: 'mockId', id: 'id' },
          ],
        },
      },
    };

    expect(actual).toEqual(expected);
  });

  it('should return same object is path to items cannot be found', () => {
    const actual = addIdsToItems({
      pathToItems: ['content', 'blah'],
    })(fixtureA);

    expect(actual).toEqual(fixtureA);
  });
});
