import pathOr from 'ramda/src/pathOr';
import deepClone from 'ramda/src/clone';
import path from 'ramda/src/path';
import {
  getVisuallyHiddenHeadlineBlock,
  getFauxHeadlineBlock,
  getHeadlineBlock,
} from './models';

const getHeadlineBlocks = (json) => {
  const headlineText = pathOr(null, ['promo', 'headlines', 'headline'], json);

  if (!headlineText) {
    return json;
  }

  return {
    visuallyHiddenHeadlineBlock: getVisuallyHiddenHeadlineBlock(headlineText),
    fauxHeadlineBlock: getFauxHeadlineBlock(headlineText),
    headlineBlock: getHeadlineBlock(headlineText),
  };
};

const firstBlockIsVideo = (blocks) =>
  ['video', 'version', 'legacyMedia', 'unavailableMedia'].includes(
    path(['0', 'type'], blocks),
  );

const insertHeadlineBlocks = (originalJson) => {
  const json = deepClone(originalJson);
  const type = path(['metadata', 'type'], json);
  const {
    fauxHeadlineBlock,
    visuallyHiddenHeadlineBlock,
    headlineBlock,
  } = getHeadlineBlocks(json);
  const blocks = path(['content', 'model', 'blocks'], json);

  if (!blocks) {
    return json;
  }

  if (type === 'MAP' && firstBlockIsVideo(blocks)) {
    json.content.model.blocks = [
      visuallyHiddenHeadlineBlock,
      blocks.shift(),
      fauxHeadlineBlock,
      ...blocks,
    ];
  } else {
    json.content.model.blocks = [headlineBlock, ...blocks];
  }

  return json;
};

export default insertHeadlineBlocks;
