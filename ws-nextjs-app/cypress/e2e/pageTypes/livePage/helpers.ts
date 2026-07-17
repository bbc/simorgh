export const getBlockByType = (blocks, blockType) => {
  let blockData;

  blocks.forEach(block => {
    if (!blockData && block.type === blockType) {
      blockData = block;
    }
  });
  return blockData;
};

export const getBlockData = (blockType, body) => {
  const { blocks } =
    body.data.liveTextStream.content.data.results[0].content.model;

  // return blocks;
  return getBlockByType(blocks, blockType);
};
