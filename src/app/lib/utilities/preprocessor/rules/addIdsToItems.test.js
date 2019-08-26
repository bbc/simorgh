import addIdsToItems from './addIdsToItems';

jest.mock('uuid', () => () => 'mockId');

const noId = {
  metadata: {},
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
          }
        ]
      }
    ]
  },
  promo: {},
  relatedContent: {},
};

const withIds = {
  metadata: {},
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
            id: 'urn:bbc:ares::asset:test/live/story-1r2e3a457'
          }
        ]
      }
    ]
  },
  promo: {},
  relatedContent: {},
};

describe('addIdsToItems rule', () => {
  it('should add ids to all content type items without ids', () => {
    const actual = addIdsToItems(noId);
    const expected = {
      metadata: {},
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
              }
            ]
          }
        ]
      },
      promo: {},
      relatedContent: {},
    };

    expect(actual).toEqual(expected);
  });

  it('should leave items with ids alone', () => {
    const actual = addIdsToItems(withIds);
    const expected = withIds;

    expect(actual).toEqual(expected);
  });
});
