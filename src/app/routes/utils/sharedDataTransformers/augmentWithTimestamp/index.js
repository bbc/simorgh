/* eslint-disable no-use-before-define */
import pathOr from 'ramda/src/pathOr';
import deepClone from '../../jsonClone';

const articleReaderBlock = {
  type: 'articleReader'
};

const augmentWithTimestamp = jsonRaw => {
  // safely get deeply nested JSON values
  const firstPublished = pathOr(null, ['metadata', 'firstPublished'], jsonRaw);
  const lastPublished = pathOr(null, ['metadata', 'lastPublished'], jsonRaw);
  const hasBlocks = pathOr(null, ['content', 'model', 'blocks'], jsonRaw);
  const canRenderTimestamp = firstPublished && lastPublished && hasBlocks;

  if (canRenderTimestamp) {
    // construct a new block from the metadata
    const timestampBlock = {
      type: 'timestamp',
      model: {
        firstPublished,
        lastPublished,
      },
    };
    return insertTimestampBlock(jsonRaw, timestampBlock);
  }

  return jsonRaw;
};

export default augmentWithTimestamp;

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
    if (firstBlockIsMedia(mainBlocks) && json.metadata.type === 'STY') {
      json.content.model.blocks = [
        ...headlineBlocks,
        timestampBlock,
        articleReaderBlock,
        mainBlocks[0],
        ...mainBlocks.slice(1),
      ];
    } else if (firstBlockIsMedia(mainBlocks)) {
      json.content.model.blocks = [
        ...headlineBlocks,
        mainBlocks[0],
        timestampBlock,
        articleReaderBlock,
        ...mainBlocks.slice(1),
      ];
    } else {
      json.content.model.blocks = [
        ...headlineBlocks,
        timestampBlock,
        articleReaderBlock,
        ...mainBlocks,
      ];
    }
  } else {
    // put timestamp block in as the first element
    json.content.model.blocks.unshift([timestampBlock, articleReaderBlock ]);
  }
  return json;
};

const splitBlocksByHeadline = blocks => {
  const headlineIndexPlusOne =
    blocks.findIndex(({ type }) =>
      ['headline', 'fauxHeadline'].includes(type),
    ) + 1;

  const headlineBlocks = blocks.slice(0, headlineIndexPlusOne);
  const mainBlocks = blocks.slice(headlineIndexPlusOne, blocks.length);

  return { headlineBlocks, mainBlocks };
};

const firstBlockIsMedia = blocks =>
  blocks.length > 0 && ['image', 'aresMedia', 'video'].includes(blocks[0].type);
