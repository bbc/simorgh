/*
Removes all group blocks from the page data
Scans the removed blocks to see if one can be used for the gist
  - If so, formats that block and reinserts it back in at a specific location
  - If not, returns the page data with all the group blocks removed
*/
import path from 'ramda/src/path';
import pathEq from 'ramda/src/pathEq';
import pathOr from 'ramda/src/pathOr';
import assocPath from 'ramda/src/assocPath';
import partition from 'ramda/src/partition';
import propEq from 'ramda/src/propEq';
import find from 'ramda/src/find';
import insert from 'ramda/src/insert';
import head from 'ramda/src/head';
import tail from 'ramda/src/tail';
import pipe from 'ramda/src/pipe';

import { GIST_TRANSFORMATION_FAILED } from '#lib/logger.const';
import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);

const getBlocks = path(['content', 'model', 'blocks']);
const setBlocks = assocPath(['content', 'model', 'blocks']);

// Split all of group blocks out from the page data
// Returns the cleaned page data and the removed blocks
// We retain the removed blocks so we can scan them for a valid gist
const removeGroupBlocks = pageData => {
  const [groupBlocks, otherBlocks] = partition(
    propEq('type', 'group'),
    getBlocks(pageData),
  );
  return [setBlocks(otherBlocks, pageData), groupBlocks];
};

// From the array of group blocks, find the first block that is a valid gist
const selectFirstValidGistBlock = blocks =>
  find(
    block =>
      [
        pathEq(['type'], 'group', block),
        pathEq(['model', 'intentType'], 'overview', block),
        pathEq(['model', 'blocks', 0, 'type'], 'text', block),
        pathOr([], ['model', 'blocks', 0, 'model', 'blocks'], block).some(
          pathEq(['type'], 'unorderedList'),
        ),
      ].every(Boolean),
    blocks,
  );

// It is possible for a gist to be split across multiple unordered list blocks
// This takes an array of unordered lists and combines them into a single block
const combineUnorderedLists = blocks => {
  if (blocks.length <= 1) return blocks;
  const listItemsPath = ['model', 'blocks'];
  const accumulationPoint = pathOr([], listItemsPath, head(blocks));
  tail(blocks).forEach(block =>
    accumulationPoint.push(...pathOr([], listItemsPath, block)),
  );
  return [head(blocks)];
};

const cleanGistBlock = block => {
  // Only include the first block within the gist
  const groupBlocksPath = ['model', 'blocks'];
  const filteredGroupBlocks = [head(path(groupBlocksPath, block))];

  // Within that first block, only allow unordered list blocks
  const textBlocksPath = ['model', 'blocks', 0, 'model', 'blocks'];
  const unorderedListBlocks = path(textBlocksPath, block).filter(
    nestedBlock => nestedBlock.type === 'unorderedList',
  );

  return pipe(
    assocPath(groupBlocksPath, filteredGroupBlocks),
    assocPath(textBlocksPath, combineUnorderedLists(unorderedListBlocks)),
  )(block);
};

// From the array of blocks in the article, determine what index the gist should be inserted at
const determineGistInsertionPoint = pageData => {
  const blocks = getBlocks(pageData);

  // We put the gist after the first headline block we find
  const firstHeadlineBlockPosition = blocks.findIndex(
    block => block.type === 'headline',
  );

  // If article has no headline block, we put the gist at the top
  if (firstHeadlineBlockPosition === -1) return 0;

  // If the headline is not immediately followed by a media block, we put the gist immediately after the headline
  const nextBlock = blocks[firstHeadlineBlockPosition + 1];
  if (!nextBlock || !['image', 'audio', 'video'].includes(nextBlock.type)) {
    return firstHeadlineBlockPosition + 1;
  }

  // Otherwise, we put the gist after that media block
  return firstHeadlineBlockPosition + 2;
};

const transformer = data => {
  const [cleanedData, removedBlocks] = removeGroupBlocks(data);
  const gistBlock = selectFirstValidGistBlock(removedBlocks);

  if (!gistBlock) return cleanedData;

  return setBlocks(
    insert(
      determineGistInsertionPoint(cleanedData),
      cleanGistBlock(gistBlock),
      getBlocks(cleanedData),
    ),
    cleanedData,
  );
};

export default data => {
  try {
    return transformer(data);
  } catch (e) {
    logger.error(GIST_TRANSFORMATION_FAILED, {
      id: data?.metadata?.id,
    });
    return data;
  }
};
