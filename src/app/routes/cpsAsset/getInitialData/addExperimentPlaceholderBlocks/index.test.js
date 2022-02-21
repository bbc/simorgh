import deepClone from 'ramda/src/clone';
import addExperimentPlaceholderBlocks from '.';

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

describe('addExperimentPlaceholderBlocks', () => {
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
                path: '/api/recommend?recSys=2&limit=4&assetUri=/news/media-333256',
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

    expect(addExperimentPlaceholderBlocks()(input)).toEqual(expected);
  });
  it('should return input if allowAdvertising is false', async () => {
    const input = deepClone(styInput);
    input.metadata.options.allowAdvertising = false;

    expect(addExperimentPlaceholderBlocks()(input)).toEqual(input);
  });
  it('should return input if page ype is not STY', async () => {
    const input = deepClone(styInput);
    input.metadata.type = 'PGL';

    expect(addExperimentPlaceholderBlocks()(input)).toEqual(input);
  });
  it('should return input if blocks is empty', async () => {
    const input = deepClone(styInput);
    delete input.content.model.blocks;

    expect(addExperimentPlaceholderBlocks()(input)).toEqual(input);
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

    expect(addExperimentPlaceholderBlocks()(input)).toEqual(input);
  });
  it('should return input with all experiment placeholder blocks if on the Hindi service', async () => {
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
              type: 'experimentBlock',
              model: {
                showForVariation: 'variation_c',
              },
            },
            {
              type: 'experimentBlock',
              model: {
                showForVariation: 'variation_a',
                part: 1,
              },
            },
            {
              type: 'experimentBlock',
              model: {
                showForVariation: 'control',
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
              type: 'experimentBlock',
              model: {
                showForVariation: 'variation_a',
                part: 2,
              },
            },
          ],
        },
      },
    };

    expect(addExperimentPlaceholderBlocks('hindi')(input)).toEqual(expected);
  });
  it('should return only the first half of the split recommendations if there are less than 10 paragraphs', async () => {
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
              type: 'experimentBlock',
              model: {
                showForVariation: 'variation_c',
              },
            },
            {
              type: 'experimentBlock',
              model: {
                showForVariation: 'variation_a',
                part: 1,
              },
            },
            {
              type: 'experimentBlock',
              model: {
                showForVariation: 'control',
              },
            },
          ],
        },
      },
    };

    expect(addExperimentPlaceholderBlocks('hindi')(input)).toEqual(expected);
  });
});
