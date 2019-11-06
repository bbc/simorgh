import pathOr from 'ramda/src/pathOr';
import deepClone from 'ramda/src/clone';
import path from 'ramda/src/path';
import { getOffScreenHeadlineBlock, getOnScreenHeadlineBlock } from './models';

const getHeadlineBlocks = json => {
  const headlineText = pathOr(null, ['promo', 'headlines', 'headline'], json);

  if (!headlineText) {
    return json;
  }

  return {
    offScreenHeadlineBlock: getOffScreenHeadlineBlock(headlineText),
    onScreenHeadlineBlock: getOnScreenHeadlineBlock(headlineText),
  };
};

const firstBlockIsVideo = blocks => path(['0', 'type'], blocks) === 'video';

const insertHeadlineBlocks = originalJson => {
  const json = deepClone(originalJson);
  const { onScreenHeadlineBlock, offScreenHeadlineBlock } = getHeadlineBlocks(
    json,
  );
  const blocks = path(['content', 'model', 'blocks'], json);

  if (!blocks) {
    return json;
  }

  if (firstBlockIsVideo(blocks)) {
    const videoBlock = blocks.slice(0, 1);
    const mainBlocks = blocks.slice(1, blocks.length);

    json.content.model.blocks = [
      offScreenHeadlineBlock,
      ...videoBlock,
      onScreenHeadlineBlock,
      ...mainBlocks,
    ];
  } else {
    json.content.model.blocks = [
      offScreenHeadlineBlock,
      onScreenHeadlineBlock,
      ...blocks,
    ];
  }

  return json;
};

export default insertHeadlineBlocks;
