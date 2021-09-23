import pathOr from 'ramda/src/pathOr';
import pathEq from 'ramda/src/pathEq';
import assocPath from 'ramda/src/assocPath';
import insert from 'ramda/src/insert';
import findNthIndex from '#lib/utilities/findNthIndex';

const getBlocks = pathOr([], ['content', 'blocks']);
const setBlocks = assocPath(['content', 'blocks']);
const podcastPromoBlock = {
  type: 'podcastPromo',
  model: {},
};

const getPromoPosition = pageData => {
  const blocks = getBlocks(pageData);
  const targetParagraph = findNthIndex(
    7,
    pathEq(['type'], 'paragraph'),
    blocks,
  );

  if (!pathEq([targetParagraph + 1, 'type'], 'paragraph', blocks)) return -1;
  if (pathEq([targetParagraph + 2, 'type'], 'list', blocks))
    return targetParagraph + 3;

  return targetParagraph;
};

const setClearingFlag = promoPosition => {};

const insertPodcastPromo = pageData => {
  const promoPosition = getPromoPosition(pageData);

  if (promoPosition < 0) return pageData;

  const blocksWithMetadata = setClearingFlag(pageData, promoPosition);

  return setBlocks(
    insert(promoPosition, podcastPromoBlock, getBlocks(pageData)),
    pageData,
  );
};

export default insertPodcastPromo;
