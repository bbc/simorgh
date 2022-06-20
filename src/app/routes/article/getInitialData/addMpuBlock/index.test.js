import clone from 'ramda/src/clone';
import addMpuBlock, { insertMpuBlock } from '.';

const styInput = {
  metadata: {
    type: 'article',
    allowAdvertising: true,
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
  afterEach(() => {
    delete process.env.SIMORGH_APP_ENV;
  });

  it('should add a block of type mpu after the first 4 paragraph blocks', async () => {
    const input = clone(styInput);
    const expected = {
      metadata: {
        type: 'article',
        allowAdvertising: true,
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
              type: 'mpu',
              model: {},
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

  it('should return input if `isLive` is true', async () => {
    const input = clone(styInput);
    process.env.SIMORGH_APP_ENV = 'live';

    expect(addMpuBlock(input)).toEqual(input);
  });

  it('should return input if `isLive` is true and `allowAdvertising` is true', async () => {
    const input = clone(styInput);
    process.env.SIMORGH_APP_ENV = 'live';
    input.metadata.allowAdvertising = true;

    expect(addMpuBlock(input)).toEqual(input);
  });

  it('should return input if `isLive` is false and `allowAdvertising` is false', async () => {
    const input = clone(styInput);
    process.env.SIMORGH_APP_ENV = 'test';
    input.metadata.allowAdvertising = false;

    expect(addMpuBlock(input)).toEqual(input);
  });

  it('should return input if page type is not Article', async () => {
    const input = clone(styInput);
    input.metadata.type = 'STY';

    expect(addMpuBlock(input)).toEqual(input);
  });

  it('should add the mpu block as the last block if there are not up to 4 paragraph blocks', async () => {
    const input = clone(styInput);
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

  it('should split a text block and add the mpu block if the text block contains multiple paragraph blocks', async () => {
    const input = clone(styInput);
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
            {
              type: 'paragraph',
            },
            {
              type: 'paragraph',
            },
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
        type: 'audio',
      },
      {
        type: 'video',
      },
    ];
    input.content.model.blocks = blocks;

    const expectation = addMpuBlock(input);

    expect(expectation.content.model.blocks).toEqual([
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
            {
              type: 'paragraph',
            },
            {
              type: 'paragraph',
            },
          ],
        },
      },
      {
        type: 'mpu',
        model: {},
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
        type: 'audio',
      },
      {
        type: 'video',
      },
    ]);
  });

  it('should add the mpu block as the last block if there are no text/paragraph blocks', async () => {
    const input = clone(styInput);
    const blocks = [
      {
        type: 'headline',
      },
      {
        type: 'timestamp',
      },
      {
        type: 'image',
      },
      {
        type: 'audio',
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

  it('should return the input if the `insertIndex` is not specified', async () => {
    const input = clone(styInput);

    expect(insertMpuBlock(input.content.model.blocks)).toEqual(
      input.content.model.blocks,
    );
  });

  it('should return the pageData if there are no blocks ', async () => {
    const pageData = {
      metadata: {
        type: 'article',
        allowAdvertising: true,
        locators: {
          assetUri: '/news/media-333256',
        },
      },
      content: {
        model: {
          blocks: [],
        },
      },
    };

    expect(addMpuBlock(pageData)).toEqual(pageData);
  });

  it('should return the pageData if content object does not exist', async () => {
    const pageData = {
      metadata: {
        type: 'article',
        allowAdvertising: true,
        locators: {
          assetUri: '/news/media-333256',
        },
      },
    };

    expect(addMpuBlock(pageData)).toEqual(pageData);
  });
});
