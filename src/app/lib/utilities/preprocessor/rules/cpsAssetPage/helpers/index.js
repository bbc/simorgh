// positions a block after the headline block
const insertBlockAfterHeadline = (targetBlock, blocks) => {
  const headlineBlock = blocks.find(({ type }) =>
    ['headline', 'fauxHeadline'].includes(type),
  );

  const remainingBlocks = blocks.filter(
    ({ type }) => !['headline', 'fauxHeadline'].includes(type),
  );

  return [headlineBlock, targetBlock, ...remainingBlocks];
};

export default insertBlockAfterHeadline;
