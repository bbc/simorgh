import pathOr from 'ramda/src/pathOr';
import pathEq from 'ramda/src/pathEq';
import assocPath from 'ramda/src/assocPath';
import insert from 'ramda/src/insert';
import slice from 'ramda/src/slice';
import findNthIndex from '#lib/utilities/findNthIndex';

const getBlocks = pathOr([], ['content', 'blocks']);
const setBlocks = assocPath(['content', 'blocks']);
const podcastPromoBlock = {
  type: 'podcastPromo',
  model: {},
};

const withListException = (blocks, targetIndex) => {
  // We want to insert the podcast promo at the target index
  // If the block that occurs 2 places later is not a list, we can continue with that plan
  if (!pathEq([targetIndex + 2, 'type'], 'list', blocks)) return targetIndex;

  // Otherwise, we need to check if the two blocks after that list are both paragraphs
  // If either of them are NOT paragraphs, we do not add the podcast promo to the blocks
  if (!pathEq([targetIndex + 3, 'type'], 'paragraph', blocks)) return -1;
  if (!pathEq([targetIndex + 4, 'type'], 'paragraph', blocks)) return -1;

  // If they're both paragraphs, we can position the promo after the list block,
  // so it can float next to those two paragraphs
  return targetIndex + 3;
};

const getPromoPosition = pageData => {
  const blocks = getBlocks(pageData);
  const targetIndex = findNthIndex(7, pathEq(['type'], 'paragraph'), blocks);

  // Only add a promo if the block after the 7th paragraph is also a paragraph
  if (!pathEq([targetIndex + 1, 'type'], 'paragraph', blocks)) return -1;

  // If the block 2 blocks after the 7th paragraph is a list, try to put it after the list
  return withListException(blocks, targetIndex);
};

// The first non-paragraph block after the promo needs to be flagged so we can clear the float
const setClearingFlag = (pageData, promoPosition) => {
  const blocksAfterPromo = slice(promoPosition, Infinity, getBlocks(pageData));
  const firstNonParagraphIndex = blocksAfterPromo.findIndex(
    block => block.type !== 'paragraph',
  );

  if (firstNonParagraphIndex < 0) return pageData;
  return assocPath(
    [
      'content',
      'blocks',
      promoPosition + firstNonParagraphIndex,
      'simorghMetadata',
      'clear',
    ],
    true,
    pageData,
  );
};

const insertPodcastPromo = pageData => {
  const promoPosition = getPromoPosition(pageData);

  if (promoPosition < 0) return pageData;

  return setBlocks(
    insert(
      promoPosition,
      podcastPromoBlock,
      getBlocks(setClearingFlag(pageData, promoPosition)),
    ),
    pageData,
  );
};

export default insertPodcastPromo;
