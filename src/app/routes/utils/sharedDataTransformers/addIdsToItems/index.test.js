import addIdsToItems from '.';

jest.mock('uuid', () => ({
  v4: () => 'mockId',
}));

const noId = {
  content: {
    groups: [
      {
        items: [
          {
            headlines: 'Test headlines',
          },
          {
            name: 'This is a test headline',
          },
        ],
      },
    ],
  },
};

const noIdNested = {
  content: {
    groups: [
      {
        items: [
          {
            headlines: 'Test headlines',
            content: {
              groups: [
                {
                  items: [
                    {
                      headlines: 'Test headlines',
                    },
                    {
                      name: 'This is a test headline',
                      content: {
                        groups: [
                          {
                            items: [
                              {
                                headlines: 'Test headlines',
                              },
                              {
                                name: 'This is a test headline',
                              },
                            ],
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          },
          {
            name: 'This is a test headline',
          },
        ],
      },
    ],
  },
};

const withIds = {
  content: {
    groups: [
      {
        items: [
          {
            headlines: 'Test headlines',
            id: 'urn:bbc:ares::asset:test/live/story-1r2e3a456',
          },
          {
            name: 'This is a test assetType',
            id: 'urn:bbc:ares::asset:test/live/story-1r2e3a457',
          },
        ],
      },
    ],
  },
};

describe('addIdsToItems rule', () => {
  it('should add ids to all content type items without ids', () => {
    const actual = addIdsToItems({
      pathToItems: ['content', 'groups', 0, 'items'],
    })(noId);
    const expected = {
      content: {
        groups: [
          {
            items: [
              {
                headlines: 'Test headlines',
                id: 'mockId',
              },
              {
                name: 'This is a test headline',
                id: 'mockId',
              },
            ],
          },
        ],
      },
    };

    expect(actual).toEqual(expected);
  });

  it('should not add id to items with ids', () => {
    const actual = addIdsToItems({
      pathToItems: ['content', 'groups', 0, 'items'],
    })(withIds);

    expect(actual).toEqual(withIds);
  });

  it('should recursively add ids to items', () => {
    const actual = addIdsToItems({
      pathToItems: ['content', 'groups', 0, 'items'],
      recursive: true,
    })(noIdNested);
    const expected = {
      content: {
        groups: [
          {
            items: [
              {
                id: 'mockId',
                headlines: 'Test headlines',
                content: {
                  groups: [
                    {
                      items: [
                        { id: 'mockId', headlines: 'Test headlines' },
                        {
                          id: 'mockId',
                          name: 'This is a test headline',
                          content: {
                            groups: [
                              {
                                items: [
                                  { id: 'mockId', headlines: 'Test headlines' },
                                  {
                                    id: 'mockId',
                                    name: 'This is a test headline',
                                  },
                                ],
                              },
                            ],
                          },
                        },
                      ],
                    },
                  ],
                },
              },
              { id: 'mockId', name: 'This is a test headline' },
            ],
          },
        ],
      },
    };

    expect(actual).toEqual(expected);
  });

  it('should add id to items with with the specified prop name', () => {
    const actual = addIdsToItems({
      pathToItems: ['content', 'groups', 0, 'items'],
      propName: 'uniqueID',
    })(withIds);
    const expected = {
      content: {
        groups: [
          {
            items: [
              {
                uniqueID: 'mockId',
                headlines: 'Test headlines',
                id: 'urn:bbc:ares::asset:test/live/story-1r2e3a456',
              },
              {
                uniqueID: 'mockId',
                name: 'This is a test assetType',
                id: 'urn:bbc:ares::asset:test/live/story-1r2e3a457',
              },
            ],
          },
        ],
      },
    };

    expect(actual).toEqual(expected);
  });
});
