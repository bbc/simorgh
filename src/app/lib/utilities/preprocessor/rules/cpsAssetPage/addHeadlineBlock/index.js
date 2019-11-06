import pathOr from 'ramda/src/pathOr';
import deepClone from 'ramda/src/clone';
import path from 'ramda/src/path';
import {
  getOffScreenHeadlineBlock,
  getOnScreenHeadlineBlock,
  getHeadlineBlock,
} from './models';

const getHeadlineBlocks = json => {
  const headlineText = pathOr(null, ['promo', 'headlines', 'headline'], json);

  if (!headlineText) {
    return json;
  }

  return {
    offScreenHeadlineBlock: getOffScreenHeadlineBlock(headlineText),
    onScreenHeadlineBlock: getOnScreenHeadlineBlock(headlineText),
    headlineBlock: getHeadlineBlock(headlineText),
  };
};

const firstBlockIsVideo = blocks => path(['0', 'type'], blocks) === 'video';

const insertHeadlineBlocks = originalJson => {
  const json = deepClone(originalJson);
  const type = path(['metadata', 'type'], json);
  const {
    onScreenHeadlineBlock,
    offScreenHeadlineBlock,
    headlineBlock,
  } = getHeadlineBlocks(json);
  const blocks = path(['content', 'model', 'blocks'], json);

  if (!blocks) {
    return json;
  }

  if (type === 'MAP' && firstBlockIsVideo(blocks)) {
    json.content.model.blocks = [
      offScreenHeadlineBlock,
      blocks.shift(),
      onScreenHeadlineBlock,
      ...blocks,
    ];
  } else {
    json.content.model.blocks = [headlineBlock, ...blocks];
  }

  return json;
};

export default insertHeadlineBlocks;
