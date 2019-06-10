import uuid from 'uuid';
import deepGet from '../../../../helpers/json/deepGet';
import compose from '../../../../helpers/compose';

let mapIdsToBlocks;

const getJsonContent = jsonRaw => deepGet(['content'], jsonRaw);

const getBlocks = content => deepGet(['model', 'blocks'], content);

const addIdsToBlock = block => {
  const blockWithId = { ...block, id: uuid() };
  const nestedBlocks = getBlocks(blockWithId);

  return nestedBlocks
    ? {
        ...blockWithId,
        model: {
          ...blockWithId.model,
          blocks: mapIdsToBlocks(nestedBlocks),
        },
      }
    : blockWithId;
};

mapIdsToBlocks = blocks => blocks.map(addIdsToBlock);

const mergeJsonRawWithBlocks = blocksWithIds => jsonRaw => ({
  ...jsonRaw,
  content: {
    ...jsonRaw.content,
    model: {
      ...jsonRaw.content.model,
      blocks: blocksWithIds,
    },
  },
});

export default jsonRaw => {
  const addIdsToBlocks = compose(
    mergeJsonRawWithBlocks,
    mapIdsToBlocks,
    getBlocks,
    getJsonContent,
  )(jsonRaw);

  return addIdsToBlocks(jsonRaw);
};
