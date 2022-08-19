import pipe from 'ramda/src/pipe';
import clone from 'ramda/src/clone';
import path from 'ramda/src/path';
import assocPath from 'ramda/src/assocPath';

import insert from 'ramda/src/insert';
import { BYLINE_TRANSFORMATION_FAILED } from '../../../lib/logger.const';
import nodeLogger from '../../../lib/logger.node';

const logger = nodeLogger(__filename);

interface PageData {
  json: any;
  metadata: any;
  content: any;
  blocks: any;
}

const getBlocks = path(['content', 'model', 'blocks']);
const setBlocks = assocPath(['content', 'model', 'blocks']);
const getType = path(['type']);

const removeExtraBylines = (json: PageData) => {
  const pageData = clone(json);
  const blocks = getBlocks(pageData) as [Record<string, unknown>];

  let foundFirstByline = false;
  const blocksWithoutExtraByline = blocks.filter(block => {
    const type = getType(block);
    if (type === 'byline') {
      if (foundFirstByline) {
        return false;
      }
      foundFirstByline = true;
    }
    return true;
  });
  return setBlocks(blocksWithoutExtraByline, pageData) as PageData;
};

const repositionByline = (json: PageData) => {
  const pageData = clone(json);
  const blocks = getBlocks(pageData) as [Record<string, unknown>];

  const firstHeadlineBlockPosition = blocks.findIndex(
    block => getType(block) === 'headline',
  );

  const firstBylineBlockPosition = blocks.findIndex(
    block => getType(block) === 'byline',
  );

  if (firstBylineBlockPosition === -1) return json;

  const newBylinePosition =
    firstHeadlineBlockPosition === -1 ? 0 : firstHeadlineBlockPosition + 1;

  const bylineBlock = clone(blocks[firstBylineBlockPosition]);

  blocks.splice(firstBylineBlockPosition, 1);

  const repositionedBylineBlocks = insert(
    newBylinePosition,
    bylineBlock,
    blocks,
  );

  return setBlocks(repositionedBylineBlocks, pageData) as PageData;
};

export default (json: PageData) => {
  try {
    const transformBylines = pipe(removeExtraBylines, repositionByline);
    return transformBylines(json);
  } catch (error) {
    logger.error(BYLINE_TRANSFORMATION_FAILED, {
      id: json?.metadata?.id,
    });
    return json;
  }
};
