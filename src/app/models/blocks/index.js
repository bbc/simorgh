export const rawVideoType = 'rawVideo';
export const imageType = 'image';
export const videoType = 'video';
export const rawImageType = 'rawImage';
export const listItemType = 'listItem';
export const orderedListType = 'orderedList';
export const unorderedListType = 'unorderedList';

const optionalIdBlock = (block, id) => (id ? { ...block, id } : { ...block });

export const singleFragmentBlock = (text, id = null) =>
  optionalIdBlock(
    {
      type: 'fragment',
      model: {
        text,
        attributes: [],
      },
    },
    id,
  );

export const singleParagraphBlock = (text, id = null) =>
  optionalIdBlock(
    {
      type: 'paragraph',
      model: {
        text,
        blocks: [singleFragmentBlock(text, id)],
      },
    },
    id,
  );

export const singleTextBlock = (text, id = null) =>
  optionalIdBlock(
    {
      type: 'text',
      model: {
        blocks: [singleParagraphBlock(text, id)],
      },
    },
    id,
  );

export const textBlock = (text, id) => ({
  blocks: [singleTextBlock(text, id)],
});

export const blockContainingText = (type, text, id = null) =>
  optionalIdBlock(
    {
      type,
      model: textBlock(text, id),
    },
    id,
  );

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

export const imageBlocks = rawBlocks =>
  stdArrayModelBlock(imageType, rawBlocks);

export const videoBlock = (rawVBlock, imgBlock) =>
  stdArrayModelBlock(videoType, [rawVBlock, imgBlock]);

export const simpleListBlock = (listItems, isOrdered) => ({
  type: 'text',
  model: {
    type: isOrdered ? orderedListType : unorderedListType,
    model: {
      blocks: listItems.map(listItem => ({
        type: listItemType,
        model: singleParagraphBlock(listItem),
      })),
    },
  },
});
