import nanoid from 'nanoid';
import deepGet from '../../../../helpers/json/deepGet';

let mapBlocks;
const getBlocks = content => deepGet(['model', 'blocks'], content);

const recursivelyAddIds = block => {
  const newBlock = { ...block, id: nanoid() };
  const nestedBlocks = getBlocks(newBlock);

  if (nestedBlocks) {
    return {
      ...newBlock,
      model: {
        ...newBlock.model,
        blocks: mapBlocks(nestedBlocks),
      },
    };
  }
  return newBlock;
};

mapBlocks = blocks => blocks.map(recursivelyAddIds);

export default jsonRaw => {
  const blocks = getBlocks(jsonRaw.content);
  const blocksWithIds = mapBlocks(blocks);

  return {
    ...jsonRaw,
    content: {
      ...jsonRaw.content,
      model: {
        ...jsonRaw.content.model,
        blocks: blocksWithIds,
      },
    },
  };
};
