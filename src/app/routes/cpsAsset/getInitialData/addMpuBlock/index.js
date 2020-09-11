/* eslint-disable prefer-destructuring */
import path from 'ramda/src/path';
import splitAt from 'ramda/src/splitAt';
import deepClone from '../../../utils/jsonClone';
import { getNthCpsParagraphIndex } from '../helpers';

const mpuBlock = {
  type: 'mpu',
  model: {},
};

const addMpuBlock = json => {
  const { allowAdvertising } = path(['metadata', 'options'], json);
  const pageType = path(['metadata', 'type'], json);

  if (!allowAdvertising || pageType !== 'STY') return json;

  const pageData = deepClone(json);

  const blocks = path(['content', 'model', 'blocks'], pageData);
  if (!blocks) return pageData;

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
