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
    headlineBlock: getOnScreenHeadlineBlock(headlineText),
  };
};

const splitBlocksByvideo = blocks => {
  if (!blocks || blocks.length < 1) {
    return {};
  }

  const videoIndexPlusOne =
    blocks.findIndex(({ type }) => type === 'video') + 1;

  const videoBlock = blocks.slice(0, videoIndexPlusOne);
  const mainBlocks = blocks.slice(videoIndexPlusOne, blocks.length);

  return { videoBlock, mainBlocks };
};

const insertHeadlineBlocks = originalJson => {
  const json = deepClone(originalJson);
  const { headlineBlock, offScreenHeadlineBlock } = getHeadlineBlocks(json);

  if (path(['content', 'model', 'blocks'], json)) {
    const { videoBlock, mainBlocks } = splitBlocksByvideo(
      json.content.model.blocks,
    );

    if (videoBlock) {
      json.content.model.blocks = [
        offScreenHeadlineBlock,
        ...videoBlock,
        headlineBlock,
        ...mainBlocks,
      ];
    }
  }

  return json;
};

export default insertHeadlineBlocks;
