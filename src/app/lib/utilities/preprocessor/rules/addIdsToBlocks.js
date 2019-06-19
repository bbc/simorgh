import uuid from 'uuid';
import deepGet from '../../deepGet';
import compose from '../../compose';

let mapIdsToBlocks;

const getJsonContent = jsonRaw => deepGet(['content'], jsonRaw);

const getBlocks = block => deepGet(['model', 'blocks'], block);

const addIdsToBlock = block => {
  const blockWithId = { ...block, id: uuid() };
  const nestedBlocks = getBlocks(blockWithId);

  if (!nestedBlocks) {
    return blockWithId;
  }

  return {
    ...blockWithId,
    model: {
      ...blockWithId.model,
      blocks: mapIdsToBlocks(nestedBlocks),
    },
  };
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
