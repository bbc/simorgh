import deepClone from 'ramda/src/clone';
import addRecommendationsBlock from '.';

const styInput = {
  metadata: {
    type: 'STY',
    options: {
      allowAdvertising: true,
    },
    locators: {
      assetUri: '/news/media-333256',
    },
  },
  content: {
    model: {
      blocks: [
        {
          type: 'headline',
        },
        {
          type: 'timestamp',
        },
        {
          type: 'text',
          model: {
            blocks: [
              {
                type: 'paragraph',
              },
            ],
          },
        },
        {
          type: 'text',
          model: {
            blocks: [
              {
                type: 'paragraph',
              },
            ],
          },
        },
        {
          type: 'image',
        },
        {
          type: 'text',
          model: {
            blocks: [
              {
                type: 'unorderedList',
              },
            ],
          },
        },
        {
          type: 'image',
        },
        {
          type: 'audio',
        },
        {
          type: 'video',
        },
        {
          type: 'text',
          model: {
            blocks: [
              {
                type: 'paragraph',
              },
            ],
          },
        },
        {
          type: 'text',
          model: {
            blocks: [
              {
                type: 'paragraph',
              },
            ],
          },
        },
        {
          type: 'subheadline',
        },
        {
          type: 'text',
          model: {
            blocks: [
              {
                type: 'paragraph',
              },
            ],
          },
        },
        {
          type: 'text',
          model: {
            blocks: [
              {
                type: 'unorderedList',
              },
            ],
          },
        },
        {
          type: 'image',
        },
        {
          type: 'audio',
        },
        {
          type: 'video',
        },
        {
          type: 'text',
          model: {
            blocks: [
              {
                type: 'paragraph',
              },
            ],
          },
        },
      ],
    },
  },
};

describe('addRecommendationsBlock', () => {
  it('should add a block of type wsoj after the first 5 paragraph blocks', async () => {
    const input = deepClone(styInput);
    const expected = {
      metadata: {
        type: 'STY',
        options: {
          allowAdvertising: true,
        },
        locators: {
          assetUri: '/news/media-333256',
        },
      },
      content: {
        model: {
          blocks: [
            {
              type: 'headline',
            },
            {
              type: 'timestamp',
            },
            {
              type: 'text',
              model: {
                blocks: [
                  {
                    type: 'paragraph',
                  },
                ],
              },
            },
            {
              type: 'text',
              model: {
                blocks: [
                  {
                    type: 'paragraph',
                  },
                ],
              },
            },
            {
              type: 'image',
            },
            {
              type: 'text',
              model: {
                blocks: [
                  {
                    type: 'unorderedList',
                  },
                ],
              },
            },
            {
              type: 'image',
            },
            {
              type: 'audio',
            },
            {
              type: 'video',
            },
            {
              type: 'text',
              model: {
                blocks: [
                  {
                    type: 'paragraph',
                  },
                ],
              },
            },
            {
              type: 'text',
              model: {
                blocks: [
                  {
                    type: 'paragraph',
                  },
                ],
              },
            },
            {
              type: 'subheadline',
            },
            {
              type: 'text',
              model: {
                blocks: [
                  {
                    type: 'paragraph',
                  },
                ],
              },
            },
            {
              type: 'wsoj',
              model: {
                type: 'recommendations',
                path:
                  '/api/recommend?recSys=2&limit=4&assetUri=/news/media-333256',
              },
            },
            {
              type: 'text',
              model: {
                blocks: [
                  {
                    type: 'unorderedList',
                  },
                ],
              },
            },
            {
              type: 'image',
            },
            {
              type: 'audio',
            },
            {
              type: 'video',
            },
            {
              type: 'text',
              model: {
                blocks: [
                  {
                    type: 'paragraph',
                  },
                ],
              },
            },
          ],
        },
      },
    };

    expect(addRecommendationsBlock(input)).toEqual(expected);
  });
  it('should return input if allowAdvertising is false', async () => {
    const input = deepClone(styInput);
    input.metadata.options.allowAdvertising = false;

    expect(addRecommendationsBlock(input)).toEqual(input);
  });
  it('should return input if page ype is not STY', async () => {
    const input = deepClone(styInput);
    input.metadata.type = 'PGL';

    expect(addRecommendationsBlock(input)).toEqual(input);
  });
  it('should return input if blocks is empty', async () => {
    const input = deepClone(styInput);
    delete input.content.model.blocks;

    expect(addRecommendationsBlock(input)).toEqual(input);
  });
  it('should return input if there are not up to 5 paragraph blocks', async () => {
    const input = deepClone(styInput);
    input.content.model.blocks = [
      {
        type: 'headline',
      },
      {
        type: 'timestamp',
      },
      {
        type: 'text',
        model: {
          blocks: [
            {
              type: 'paragraph',
            },
          ],
        },
      },
      {
        type: 'text',
        model: {
          blocks: [
            {
              type: 'paragraph',
            },
          ],
        },
      },
    ];

    expect(addRecommendationsBlock(input)).toEqual(input);
  });
});
