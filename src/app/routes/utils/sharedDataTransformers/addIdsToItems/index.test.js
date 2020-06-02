import addIdsToItems from '.';

jest.mock('uuid', () => () => 'mockId');

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
    const actual = addIdsToItems(noId);
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
    const actual = addIdsToItems(withIds);

    expect(actual).toEqual(withIds);
  });
});
