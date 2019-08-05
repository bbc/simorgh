export const rawVideoType = 'rawVideo';
export const imageType = 'image';
export const videoType = 'video';
export const rawImageType = 'rawImage';

export const singleTextBlock = (text, id = null) => ({
  type: 'text',
  model: {
    blocks: [
      {
        type: 'paragraph',
        model: {
          text,
          blocks: [
            {
              id,
              type: 'fragment',
              model: {
                text,
                attributes: [],
              },
            },
          ],
        },
      },
    ],
  },
});

export const textBlock = (text, id) => ({
  blocks: [singleTextBlock(text, id)],
});

export const blockContainingText = (type, text, id = null) => ({
  type,
  model: textBlock(text, id),
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
