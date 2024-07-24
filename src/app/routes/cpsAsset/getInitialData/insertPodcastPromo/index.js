import pathOr from 'ramda/src/pathOr';
import pathEq from 'ramda/src/pathEq';
import assocPath from 'ramda/src/assocPath';
import insert from 'ramda/src/insert';
import slice from 'ramda/src/slice';
import findNthIndex from '#lib/utilities/findNthIndex';

// Podcast promos are inserted if the page content has a continuous sequence of paragraph blocks
// These paragraph blocks must have a minimum character count in total to ensure there is
// enough text to wrap around the promo component
const MINIMUM_CHARACTER_COUNT = 940;

// The earliest we can insert a podcast promo is next to the 8th paragraph
const EARLIEST_PARAGRAPH_INSERTION_POINT = 8;

const getBlocks = pathOr([], ['content', 'blocks']);
const setBlocks = assocPath(['content', 'blocks']);
const podcastPromoBlock = {
  type: 'podcastPromo',
  model: {},
};

const isParagraphBlock = block => block.type === 'paragraph';
const countParagraphCharacters = block => {
  const sanitizedText = block.text.replace(/(<([^>]+)>)/gi, '');
  return sanitizedText?.length || 0;
};

// Find the starting point for the first continuous sequence of
// text blocks that meet our requirements, or -1 if none do
const getContinuousTextIndex = (blocks, startingIndex) => {
  // The starting index of the sequence currently being considered
  let sequenceStartPoint = startingIndex;
  // Running total of how many characters this sequence contains
  let characterCount = 0;

  for (let i = startingIndex; i < blocks.length; i += 1) {
    // If the next block is a paragraph block, it gets added to our sequence
    if (isParagraphBlock(blocks[i])) {
      characterCount += countParagraphCharacters(blocks[i]);
      if (characterCount >= MINIMUM_CHARACTER_COUNT) return sequenceStartPoint;
    } else {
      // If it is not a paragraph block, our sequence has ended and doesn't have
      // enough characters.  Start evaluating the next sequence.
      sequenceStartPoint = i + 1;
      characterCount = 0;
    }
  }
  return -1;
};

const getPromoPosition = pageData => {
  const blocks = getBlocks(pageData);
  const targetIndex = findNthIndex(
    EARLIEST_PARAGRAPH_INSERTION_POINT,
    pathEq('paragraph', ['type']),
    blocks,
  );
  if (targetIndex < 0) return targetIndex;
  return getContinuousTextIndex(blocks, targetIndex);
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
