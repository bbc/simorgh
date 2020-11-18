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
  if (!blocks || !count) {
    return null;
  }

  const paragraphBlockIndexes = blocks
    .map((block, index) => isCpsParagraphBlock(block) && index)
    .filter(Boolean);

  if (paragraphBlockIndexes.length < count) {
    return null;
  }

  return paragraphBlockIndexes[count - 1];
};
