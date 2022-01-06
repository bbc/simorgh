import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import deepClone from '../../../utils/jsonClone';
import {
  getVisuallyHiddenHeadlineBlock,
  getFauxHeadlineBlock,
  getHeadlineBlock,
} from './models';

const getHeadlineBlocks = json => {
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

const firstBlockIsVideo = blocks =>
  ['video', 'version', 'legacyMedia', 'unavailableMedia'].includes(
    path(['0', 'type'], blocks),
  );

const insertHeadlineBlocks = originalJson => {
  const json = deepClone(originalJson);
  const type = path(['metadata', 'type'], json);
  const { fauxHeadlineBlock, visuallyHiddenHeadlineBlock, headlineBlock } =
    getHeadlineBlocks(json);
  const blocks = path(['content', 'model', 'blocks'], json);

  if (!blocks) {
    return json;
  }

  if (type === MEDIA_ASSET_PAGE && firstBlockIsVideo(blocks)) {
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
