export const rawVideoType = 'rawVideo';
export const imageType = 'image';
export const videoType = 'video';
export const rawImageType = 'rawImage';
export const singleTextBlock = text => ({
  id: '92749127',
  type: 'text',
  model: {
    blocks: [
      {
        id: '92083087',
        type: 'paragraph',
        model: {
          text,
          blocks: [
            {
              id: '12498792',
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

export const textBlock = text => ({
  blocks: [singleTextBlock(text)],
});

export const blockContainingText = (type, text) => ({
  id: 'blockContainingText',
  type,
  model: textBlock(text),
});

export const blockBase = (blockType, blockModel) => ({
  id: 'blockBase',
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
