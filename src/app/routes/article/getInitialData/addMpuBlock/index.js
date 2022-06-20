import path from 'ramda/src/path';
import splitAt from 'ramda/src/splitAt';
import flatten from 'ramda/src/flatten';
import clone from 'ramda/src/clone';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import isLive from '#app/lib/utilities/isLive';

const mpuBlock = {
  type: 'mpu',
  model: {},
};

export const insertMpuBlock = (blocks, insertIndex) => {
  if (!insertIndex) {
    return blocks;
  }

  const newBlocks = clone(blocks);

  const textBlocksWithParagraphs = [];

  blocks.forEach((block, i) => {
    if (block.type === 'text') {
      const numOfParagraphs = path(['model', 'blocks'], block).filter(
        textBlock => textBlock.type === 'paragraph',
      ).length;

      if (numOfParagraphs > 0) {
        textBlocksWithParagraphs.push({
          index: i,
          numOfParagraphs,
        });
      }
    }
  });

  const totalParagraphs = textBlocksWithParagraphs.reduce(
    (acc, curr) => acc + curr.numOfParagraphs,
    0,
  );

  // Add the MPU block after the very last block if there are not enough paragraphs
  if (totalParagraphs < insertIndex) {
    newBlocks.push(mpuBlock);
    return newBlocks;
  }

  const insertData = {
    blockIndex: null,
    paragraphSplitAtIndex: null,
  };

  let paragraphsCount = 0;

  textBlocksWithParagraphs.some(block => {
    paragraphsCount += block.numOfParagraphs;

    if (paragraphsCount >= insertIndex) {
      insertData.blockIndex = block.index;
      insertData.paragraphSplitAtIndex =
        insertIndex - (paragraphsCount - block.numOfParagraphs);
      return true;
    }
    return false;
  });

  const textBlock = blocks[insertData.blockIndex];
  const textBlockParagraphs = path(['model', 'blocks'], textBlock);
  const splitParagraphBlocks = splitAt(
    insertData.paragraphSplitAtIndex,
    textBlockParagraphs,
  );

  const blocksWithMpu = [
    splitParagraphBlocks[0].length && {
      type: 'text',
      model: { blocks: splitParagraphBlocks[0] },
    },
    mpuBlock,
    splitParagraphBlocks[1].length && {
      type: 'text',
      model: { blocks: splitParagraphBlocks[1] },
    },
  ].filter(Boolean);

  newBlocks[insertData.blockIndex] = blocksWithMpu;

  return flatten(newBlocks);
};

const addMpuBlock = json => {
  const { allowAdvertising } = path(['metadata'], json);
  const pageType = path(['metadata', 'type'], json);

  /* TODO: Remove `isLive` checks when editorial are happy with the ads display */
  if (isLive() || (!isLive() && !allowAdvertising) || pageType !== ARTICLE_PAGE)
    return json;

  const pageData = clone(json);

  const blocks = path(['content', 'model', 'blocks'], pageData);
  if (!blocks || blocks.length === 0) return pageData;

  pageData.content.model.blocks = insertMpuBlock(blocks, 4);

  return pageData;
};

export default addMpuBlock;
