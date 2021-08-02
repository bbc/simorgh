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

// We only support group blocks that have an intentType of overview
// One of these overview groups is selected to generate the article "gist"
const getBlocks = path(['content', 'model', 'blocks']);
const setBlocks = assocPath(['content', 'model', 'blocks']);

const removeGroupBlocks = pageData => {
  const [groupBlocks, otherBlocks] = partition(
    propEq('type', 'group'),
    getBlocks(pageData),
  );
  return [setBlocks(otherBlocks, pageData), groupBlocks];
};

const selectFirstValidGistBlock = blocks => {
  const isValidGistBlock = block => {
    return [
      pathEq(['type'], 'group', block),
      pathEq(['model', 'intentType'], 'overview', block),
      pathEq(['model', 'blocks', 0, 'type'], 'text', block),
      pathOr([], ['model', 'blocks', 0, 'model', 'blocks'], block).some(
        pathEq(['type'], 'unorderedList'),
      ),
    ].every(Boolean);
  };
  return find(isValidGistBlock, blocks);
};

const determineGistInsertionPoint = pageData => {
  const blocks = getBlocks(pageData);
  return 0;
};

const flattenUnorderedLists = blocks => {
  const listItemsPath = ['model', 'blocks'];
  const accumulationPoint = pathOr([], listItemsPath, head(blocks));
  tail(blocks).forEach(block =>
    accumulationPoint.push(...pathOr([], listItemsPath, block)),
  );
  return [head(blocks)];
};

const cleanGistBlock = block => {
  const groupBlocksPath = ['model', 'blocks'];
  const filteredGroupBlocks = [head(path(groupBlocksPath, block))];

  const textBlocksPath = ['model', 'blocks', 0, 'model', 'blocks'];
  const unorderedListBlocks = path(textBlocksPath, block).filter(
    nestedBlock => nestedBlock.type === 'unorderedList',
  );

  const returnBlock = pipe(
    assocPath(groupBlocksPath, filteredGroupBlocks),
    assocPath(textBlocksPath, flattenUnorderedLists(unorderedListBlocks)),
  )(block);

  return returnBlock;
};

export default data => {
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
