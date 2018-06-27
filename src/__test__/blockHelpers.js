// Type constatns
export const rawVideoType = "rawVideo";
export const imageType = "image";
export const videoType = "video";
export const rawImageType = "rawImage";


export const textBlock = text => ({
  blocks: [
    {
      type: 'text',
      model: {
        blocks: [
          {
            type: 'paragraph',
            model: {
              text,
            },
          },
        ],
      },
    },
  ],
});

export const blockContainingText = (type, text) => ({
  type,
  model: textBlock(text),
});

export const blockBase = (blockType, blockModel) => ({
  type: blockType,
  model: blockModel
});

// Models

// a model which contains the block array
export const blockArrayModel = (arrayOfBlocks) => (
  {
    blocks: arrayOfBlocks
  }
);

export const rawVideoModel = (videoLocator, videoVersionId, videoKind, videoDuration) => ({
  locator: videoLocator,
  versionID: videoVersionId,
  kind: videoKind,
  duration: videoDuration
});

export const rawImageModel = (imageLocator) => ({
  locator: imageLocator
});

// Blocks

export const stdArrayModelBlock = (blockType, modelArray) => (
  blockBase(blockType, blockArrayModel(modelArray))
)

export const rawVideoBlock = (model) => (
  blockBase(rawVideoType, model)
);

export const rawImageBlock = (model) =>(
  blockBase(rawImageType, model)
)
// Takes in the raw image block and outputs the full image block
export const imageBlock = (rawBlock) => (
  stdArrayModelBlock(imageType, [rawBlock])
);
// Takes in a rawVideoBlock and an Image block and outputs the full video block
export const videoBlock = (rawVBlock, imgBlock) => (
  stdArrayModelBlock(videoType, [rawVBlock, imgBlock])
);


