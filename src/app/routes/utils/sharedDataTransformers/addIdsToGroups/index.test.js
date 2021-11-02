import addIdsToGroups from '.';

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

const noGroups = {
  content: {
    blah: [],
  },
};

describe('addIdsToGroups rule', () => {
  it('should add ids to all content type items without ids', () => {
    const actual = addIdsToGroups(noId);
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
    const actual = addIdsToGroups(withIds);

    expect(actual).toEqual(withIds);
  });

  it('should return the same object if groups cannot be found', () => {
    const actual = addIdsToGroups(noGroups);

    expect(actual).toEqual(noGroups);
  });
});
