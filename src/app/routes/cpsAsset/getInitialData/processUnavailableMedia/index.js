import pathOr from 'ramda/src/pathOr';
import assocPath from 'ramda/src/assocPath';
import path from 'ramda/src/path';
import nodeLogger from '#lib/logger.node';
import { NO_MEDIA_BLOCK } from '#lib/logger.const';
import { logMediaError } from '#lib/utilities/logging';

const logger = nodeLogger(__filename);

export const UNAVAILABLE_MEDIA_TEXT = 'unavailableMedia';
export const EXTERNAL_VPID = 'external_vpid';
export const unavailableMediaBlock = {
  type: UNAVAILABLE_MEDIA_TEXT,
  model: {},
  id: UNAVAILABLE_MEDIA_TEXT,
};

export const logUnavailableMedia = (blocks, url) => {
  const mediaBlock = blocks.find(block => block.type === EXTERNAL_VPID);
  if (mediaBlock) {
    logMediaError({ logger, mediaBlock, url });
  }
};

export const addUnavailableMediaBlock = pageData => {
  const blocks = pathOr([], ['content', 'model', 'blocks'], pageData);
  const url = path(['metadata', 'locators', 'assetUri'], pageData);
  logUnavailableMedia(blocks, url);
  const filteredBlocks = blocks.filter(block => block.type !== EXTERNAL_VPID);
  return assocPath(
    ['content', 'model', 'blocks'],
    [unavailableMediaBlock, ...filteredBlocks],
    pageData,
  );
};

const logIfNoMedia = (blockTypes, pageData) => {
  if (!blockTypes.includes(EXTERNAL_VPID)) {
    logger.warn(NO_MEDIA_BLOCK, {
      url: path(['metadata', 'locators', 'assetUri'], pageData),
    });
  }
};

const transformer = pageData => {
  const blockTypes = pathOr([], ['metadata', 'blockTypes'], pageData);
  const hasPlayableMedia = blockTypes.some(blockType =>
    ['media', 'legacyMedia', 'version'].includes(blockType),
  );
  if (!hasPlayableMedia) {
    logIfNoMedia(blockTypes, pageData);
    return addUnavailableMediaBlock(pageData);
  }
  return pageData;
};

export default transformer;
