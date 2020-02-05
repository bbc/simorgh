import pathOr from 'ramda/src/pathOr';
import deepClone from 'ramda/src/clone';
import path from 'ramda/src/path';
import convertToBylineBlock from './models';

const getBylineBlock = json => {
  const byline = pathOr(null, ['promo', 'byline'], json);

  if (!byline) {
    return json;
  }

  return byline;
};

const insertBylineBlock = originalJson => {
  const json = deepClone(originalJson);
  const type = path(['metadata', 'type'], json);
  const bylineBlock = convertToBylineBlock(getBylineBlock(json));
  const blocks = path(['content', 'model', 'blocks'], json);

  if (!blocks) {
    return json;
  }

  console.log(bylineBlock);

  // if (type === 'STY') {
  //   json.content.model.blocks = [
  //     visuallyHiddenHeadlineBlock,
  //     blocks.shift(),
  //     fauxHeadlineBlock,
  //     ...blocks,
  //   ];
  // } else {
  //   json.content.model.blocks = [bylineBlock, ...blocks];
  // }
  json.content.model.blocks = [blocks.shift(), bylineBlock, ...blocks];

  return json;
};

export default insertBylineBlock;
