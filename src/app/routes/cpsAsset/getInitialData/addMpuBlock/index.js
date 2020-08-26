/* eslint-disable prefer-destructuring */
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import deepClone from 'ramda/src/clone';
import splitAt from 'ramda/src/splitAt';
import { getNthCpsParagraphIndex } from '../helpers';

const mpuBlock = {
  type: 'mpu',
  model: {},
};

/**
 * Returns `pageData` with an MPU block inserted after the fourth paragraph.
 * If there aren't four paragraphs, the MPU is inserted at the end of the
 * content. If `allowAdvertising` is `false` or `pageType` is not a story page,
 * `pageData` is returned unchanged.
 * @param {Object} pageData A page data object.
 */
const addMpuBlock = json => {
  const pageData = deepClone(json);
  const pageType = path(['metadata', 'type'], pageData);
  const { allowAdvertising } = path(['metadata', 'options'], pageData);
  const blocks = pathOr([], ['content', 'model', 'blocks'], pageData);

  if (pageType !== 'STY' || !blocks || !allowAdvertising) {
    return pageData;
  }

  const mpuInsertionIndex = getNthCpsParagraphIndex(blocks, 4) || blocks.length;

  const [blocksBeforeIndex, blocksAfterIndex] = splitAt(
    mpuInsertionIndex + 1,
    blocks,
  );

  pageData.content.model.blocks = [
    ...blocksBeforeIndex,
    mpuBlock,
    ...blocksAfterIndex,
  ];

  return pageData;
};

export default addMpuBlock;
