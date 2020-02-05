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

  const blocks = path(['content', 'model', 'blocks'], json);

  if (!blocks) {
    return json;
  }

  if (type === 'STY') {
    // add after headline block
    const bylineBlock = convertToBylineBlock(getBylineBlock(json));
    json.content.model.blocks = [blocks.shift(), bylineBlock, ...blocks];
  }

  return json;
};

export default insertBylineBlock;
