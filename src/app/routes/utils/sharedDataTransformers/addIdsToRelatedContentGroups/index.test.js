import addIdsToRelatedContentGroups from '.';

jest.mock('uuid', () => ({
  v4: () => 'mockId',
}));

const noId = {
  content: {
    groups: [
      {
        promos: [
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
        promos: [
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

describe('addIdsToRelatedContentGroups rule', () => {
  it('should add ids to all content type promos without ids', () => {
    const actual = addIdsToRelatedContentGroups(noId);
    const expected = {
      content: {
        groups: [
          {
            promos: [
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

  it('should not add id to promos with ids', () => {
    const actual = addIdsToRelatedContentGroups(withIds);

    expect(actual).toEqual(withIds);
  });

  it('should return the same object if groups cannot be found', () => {
    const actual = addIdsToRelatedContentGroups(noGroups);

    expect(actual).toEqual(noGroups);
  });
});
