import addIdsToItems from './addIdsToItems';

jest.mock('uuid', () => () => 'mockId');

const noId = {
  content: {
    groups: [
      {
        type: 'responsive-top-stories',
        title: 'Top Stories',
        items: [
          {
            headlines: 'Test headlines',
            locators: {},
            summary: 'This is a test that checks addIdsToItems',
            cpsType: 'LIV',
          },
          {
            name: 'This is a test assetType',
            uri: 'https://www.test.url.com',
            contentType: 'Text',
            assetTypeCode: 'PRO',
            type: 'link',
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
        type: 'responsive-top-stories',
        title: 'Top Stories',
        items: [
          {
            headlines: 'Test headlines',
            locators: {},
            summary: 'This is a test that checks addIdsToItems',
            cpsType: 'LIV',
            id: 'urn:bbc:ares::asset:test/live/story-1r2e3a456',
          },
          {
            name: 'This is a test assetType',
            uri: 'https://www.test.url.com',
            contentType: 'Text',
            assetTypeCode: 'PRO',
            type: 'link',
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
            type: 'responsive-top-stories',
            title: 'Top Stories',
            items: [
              {
                headlines: 'Test headlines',
                locators: {},
                summary: 'This is a test that checks addIdsToItems',
                cpsType: 'LIV',
                id: 'mockId',
              },
              {
                name: 'This is a test assetType',
                uri: 'https://www.test.url.com',
                contentType: 'Text',
                assetTypeCode: 'PRO',
                type: 'link',
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
