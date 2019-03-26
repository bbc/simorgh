/* eslint-disable no-use-before-define */
import webLogger from '../src/app/helpers/logger.web';

const Preprocessor = (jsonRaw = {}, logger = webLogger) => {
  try {
    // safely get deeply nested JSON values
    const firstPublished = get(['metadata', 'firstPublished'], jsonRaw);
    const lastUpdated = get(['metadata', 'lastUpdated'], jsonRaw);
    const canRenderTimestamp =
      firstPublished &&
      lastUpdated &&
      get(['content', 'model', 'blocks'], jsonRaw);

    if (canRenderTimestamp) {
      // construct a new block from the metadata
      const timestampBlock = {
        type: 'timestamp',
        model: {
          published: firstPublished,
          updated: lastUpdated,
        },
      };
      return insertTimestampBlock(jsonRaw, timestampBlock);
    }
  } catch (e) {
    // if our block manipulation fails for whatever reason, fall back to jsonRaw
    logger.error(`JSON preprocessing failed`);
  }
  return jsonRaw;
};

// taken from https://medium.com/javascript-inside/safely-accessing-deeply-nested-values-in-javascript-99bf72a0855a
const get = (path, object) =>
  path.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), object);

/**
 * Where the `timestampBlock` is inserted in the payload is dependent on the
 * presence or absence of a `headline` block, and other factors.
 * @param {Object} json
 * @param {Object} timestampBlock
 */
const insertTimestampBlock = (originalJson, timestampBlock) => {
  const json = deepClone(originalJson); // make a copy so we don't corrupt the input
  const { headlineBlocks, mainBlocks } = splitBlocksByHeadline(
    json.content.model.blocks,
  );
  if (headlineBlocks.length > 0) {
    // insert timestamp block immediately after headline
    json.content.model.blocks = [
      ...headlineBlocks,
      timestampBlock,
      ...mainBlocks,
    ];
  } else {
    // put timestamp block in as the first element
    json.content.model.blocks.unshift(timestampBlock);
  }
  return json;
};

const splitBlocksByHeadline = blocks => {
  const headlineIndexPlusOne =
    blocks.findIndex(({ type }) => type === 'headline') + 1;

  const headlineBlocks = blocks.slice(0, headlineIndexPlusOne);
  const mainBlocks = blocks.slice(headlineIndexPlusOne, blocks.length);

  return { headlineBlocks, mainBlocks };
};

export const deepClone = originalObj => JSON.parse(JSON.stringify(originalObj));

export default Preprocessor;
