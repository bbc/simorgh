import pathOr from 'ramda/src/pathOr';
import assocPath from 'ramda/src/assocPath';
import nodeLogger from '#lib/logger.node';
import { NO_MEDIA_BLOCK } from '#lib/logger.const';

const logger = nodeLogger(__filename);

const UNAVAILABLE_MEDIA_TEXT = 'unavailableMedia';
const REVOKED_MEDIA = 'external_vpid';
export const unavailableMediaBlock = {
  type: UNAVAILABLE_MEDIA_TEXT,
  model: {},
  id: UNAVAILABLE_MEDIA_TEXT,
};

export const addUnavailableMediaBlock = pageData => {
  const blocks = pathOr([], ['content', 'model', 'blocks'], pageData);
  const filteredBlocks = blocks.filter(block => block.type !== REVOKED_MEDIA);
  return assocPath(
    ['content', 'model', 'blocks'],
    [unavailableMediaBlock, ...filteredBlocks],
    pageData,
  );
};

const logIfNoMedia = blockTypes => {
  if (!blockTypes.includes(REVOKED_MEDIA)) {
    logger.warn(NO_MEDIA_BLOCK, { warning: 'No media detected in response' });
  }
};

const transformer = pageData => {
  const blockTypes = pathOr([], ['metadata', 'blockTypes'], pageData);
  const hasPlayableMedia = blockTypes.some(blockType =>
    ['media', 'legacyMedia', 'version'].includes(blockType),
  );
  if (!hasPlayableMedia) {
    logIfNoMedia(blockTypes);
    return addUnavailableMediaBlock(pageData);
  }
  return pageData;
};

export default transformer;
