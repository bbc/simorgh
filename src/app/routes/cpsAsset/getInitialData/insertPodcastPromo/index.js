import pathOr from 'ramda/src/pathOr';
import pathEq from 'ramda/src/pathEq';
import assocPath from 'ramda/src/assocPath';
import insert from 'ramda/src/insert';
import findNthIndex from '#lib/utilities/findNthIndex';

const getBlocks = pathOr([], ['content', 'model', 'blocks']);
const setBlocks = assocPath(['content', 'model', 'blocks']);
const podcastPromoBlock = {
  type: 'podcastPromo',
  model: {},
};

const getPromoPosition = pageData =>
  findNthIndex(7, pathEq(['type'], 'text'), getBlocks(pageData));

const insertPodcastPromo = pageData => {
  const promoPosition = getPromoPosition(pageData);

  if (promoPosition < 0) return pageData;

  return setBlocks(
    insert(promoPosition, podcastPromoBlock, getBlocks(pageData)),
    pageData,
  );
};

export default insertPodcastPromo;
