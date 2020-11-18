import deepClone from 'ramda/src/clone';
import addMpuBlock from '.';

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

describe('addMpuBlock', () => {
  it('should add a block of type mpu after the first 4 paragraph blocks', async () => {
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
              model: {},
              type: 'mpu',
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

    expect(addMpuBlock(input)).toEqual(expected);
  });
  it('should return input if allowAdvertising is false', async () => {
    const input = deepClone(styInput);
    input.metadata.options.allowAdvertising = false;

    expect(addMpuBlock(input)).toEqual(input);
  });
  it('should return input if page type is not STY', async () => {
    const input = deepClone(styInput);
    input.metadata.type = 'PGL';

    expect(addMpuBlock(input)).toEqual(input);
  });

  it('should add the mpu block as the last block if there are not up to 4 paragraph blocks', async () => {
    const input = deepClone(styInput);
    const blocks = [
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
    input.content.model.blocks = blocks;

    const expectation = addMpuBlock(input);

    expect(expectation.content.model.blocks).toEqual([
      ...blocks,
      {
        type: 'mpu',
        model: {},
      },
    ]);
  });
});
