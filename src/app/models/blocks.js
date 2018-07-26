export const rawVideoType = 'rawVideo';
export const imageType = 'image';
export const videoType = 'video';
export const rawImageType = 'rawImage';

export const textBlock = text => ({
  blocks: [
    {
      type: 'text',
      blockId: 't-1',
      model: {
        blocks: [
          {
            type: 'paragraph',
            blockId: 'p-1',
            model: {
              text,
            },
          },
        ],
      },
    },
  ],
});

export const mainContentBlock = [
  {
    type: 'headline',
    blockId: '1',
    model: {
      blocks: [
        {
          type: 'text',
          blockId: 't-1',
          model: {
            blocks: [
              {
                type: 'paragraph',
                blockId: 'p-1',
                model: {
                  text: 'This is a headline!',
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    type: 'text',
    blockId: '2',
    model: {
      blocks: [
        {
          type: 'paragraph',
          blockId: 'p-2',
          model: {
            text: 'This is some text content!',
          },
        },
      ],
    },
  },
  {
    type: 'test',
    blockId: '3',
    model: {
      blocks: [
        {
          model: {
            text: 'This is some test content!',
          },
        },
      ],
    },
  },
  {
    blockId: '1',
    type: 'image',
    model: {
      blocks: [
        {
          blockId: '1-1',
          type: 'rawImage',
          model: {
            width: 640,
            height: 420,
            locator: '/cpsprodpb/E7DB/production/_101655395_paulineclayton.jpg',
            originCode: null,
            copyrightHolder: 'BBC',
          },
        },
        {
          blockId: '1-2',
          type: 'altText',
          model: {
            blocks: [
              {
                blockId: '1-2-1',
                type: 'text',
                model: {
                  blocks: [
                    {
                      type: 'paragraph',
                      blockId: '1-2-2',
                      model: {
                        text: 'Pauline Clayton',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          blockId: '2',
          type: 'caption',
          model: {
            blocks: [
              {
                blockId: '2-1',
                type: 'text',
                model: {
                  blocks: [
                    {
                      type: 'paragraph',
                      blockId: '2-1-1',
                      model: {
                        text:
                          'Former embroider Pauline Clayton described the gift as "lovely"',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
];

export const blockContainingText = (type, text) => ({
  type,
  model: textBlock(text),
});

export const blockBase = (blockType, blockModel) => ({
  type: blockType,
  model: blockModel,
});

export const blockArrayModel = arrayOfBlocks => ({
  blocks: arrayOfBlocks,
});

export const rawVideoModel = (
  videoLocator,
  videoVersionId,
  videoKind,
  videoDuration,
) => ({
  locator: videoLocator,
  versionID: videoVersionId,
  kind: videoKind,
  duration: videoDuration,
});

export const rawImageModel = imageLocator => ({
  locator: imageLocator,
});

export const stdArrayModelBlock = (blockType, modelArray) =>
  blockBase(blockType, blockArrayModel(modelArray));

export const rawVideoBlock = model => blockBase(rawVideoType, model);

export const rawImageBlock = model => blockBase(rawImageType, model);

export const imageBlock = rawBlock => stdArrayModelBlock(imageType, [rawBlock]);

export const videoBlock = (rawVBlock, imgBlock) =>
  stdArrayModelBlock(videoType, [rawVBlock, imgBlock]);
