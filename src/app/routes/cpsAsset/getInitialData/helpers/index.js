import path from 'ramda/src/path';

// positions a block after the headline block
export const insertBlockAfterHeadline = (targetBlock, blocks) => {
  const headlineBlock = blocks.find(({ type }) =>
    ['headline', 'fauxHeadline'].includes(type),
  );

  const remainingBlocks = blocks.filter(
    ({ type }) => !['headline', 'fauxHeadline'].includes(type),
  );

  return [headlineBlock, targetBlock, ...remainingBlocks];
};

const isCpsParagraphBlock = cpsBlock => {
  if (cpsBlock.type === 'text') {
    const paragraphBlocks = path(['model', 'blocks'], cpsBlock).filter(
      block => block.type === 'paragraph',
    );
    return !!paragraphBlocks.length;
  }
  return false;
};

export const getNthCpsParagraphIndex = (blocks, count) => {
  let indexCount = 0;
  let paragraphCount = 0;
  blocks.some((block, index) => {
    if (isCpsParagraphBlock(block)) {
      paragraphCount += 1;
    }
    if (paragraphCount === count || !count) {
      indexCount = index;
      return true;
    }
    return false;
  });
  if (paragraphCount < count || !count) {
    return null;
  }
  return indexCount;
};

export default insertBlockAfterHeadline;
