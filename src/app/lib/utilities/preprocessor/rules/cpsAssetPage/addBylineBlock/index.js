import pathOr from 'ramda/src/pathOr';
import deepClone from 'ramda/src/clone';
import convertToBylineBlock from './models';

const getBylineBlock = json => {
  const byline = pathOr(null, ['promo', 'byline'], json);

  if (!byline) {
    return null;
  }

  return byline;
};

const addBylineBlock = originalJson => {
  const json = deepClone(originalJson);
  const type = pathOr(null, ['metadata', 'type'], json);

  const blocks = pathOr(null, ['content', 'model', 'blocks'], json);

  if (!blocks || type !== 'STY') {
    return json;
  }

  const byline = getBylineBlock(json);
  if (byline) {
    const bylineBlock = convertToBylineBlock(byline);
    json.content.model.blocks = [blocks.shift(), bylineBlock, ...blocks];
  }

  return json;
};

export default addBylineBlock;
