/* eslint-disable prefer-destructuring */
import path from 'ramda/src/path';
import splitAt from 'ramda/src/splitAt';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import deepClone from '../../../utils/jsonClone';

const isParagraphBlock = articleBlock => {
  if (articleBlock.type === 'text') {
    const paragraphBlocks = path(['model', 'blocks'], articleBlock).filter(
      block => block.type === 'paragraph',
    );
    return !!paragraphBlocks.length;
  }
  return false;
};

const getNthParagraphIndex = (blocks, count) => {
  if (!blocks || !count) {
    return null;
  }

  const paragraphBlockIndexes = blocks
    .map((block, index) => isParagraphBlock(block) && index)
    .filter(Boolean);

  if (paragraphBlockIndexes.length < count) {
    return null;
  }
  return paragraphBlockIndexes[count - 1];
};

const insertMpuBlock = (mpuBlock, blocks) => {
  const fourthParagraphIndex = getNthParagraphIndex(blocks, 4);
  if (!fourthParagraphIndex) {
    return blocks;
  }

  const parts = splitAt(fourthParagraphIndex + 1, blocks);

  return [...parts[0], { ...mpuBlock }, ...parts[1]];
};

const mpuBlock = {
  type: 'mpu',
  model: {},
};

const addMpuBlock = json => {
  const { allowAdvertising } = path(['metadata', 'options'], json);
  const pageType = path(['metadata', 'type'], json);

  if (pageType !== ARTICLE_PAGE) return json;

  const pageData = deepClone(json);

  const blocks = path(['content', 'model', 'blocks'], pageData);
  if (!blocks) return pageData;

  pageData.content.model.blocks = insertMpuBlock(mpuBlock, blocks);

  return pageData;
};

export default addMpuBlock;
