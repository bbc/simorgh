import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import deepClone from 'ramda/src/clone';
import convertToBylineBlock from './models';

const getBylineBlock = json => {
  const byline = pathOr(null, ['promo', 'byline'], json);

  if (!byline) {
    return null;
  }

  return {
    name: path(['name'], byline) || path(['persons', '0', 'name'], byline),
    title:
      path(['title'], byline) || path(['persons', '0', 'function'], byline),
  };
};

const addBylineBlock = originalJson => {
  const json = deepClone(originalJson);
  const pageType = pathOr(null, ['metadata', 'type'], json);

  const blocks = pathOr(null, ['content', 'model', 'blocks'], json);

  if (!blocks || pageType !== 'STY') {
    return json;
  }

  const byline = getBylineBlock(json);
  if (byline) {
    const bylineBlock = convertToBylineBlock(byline);

    const headline = blocks.find(({ type }) =>
      ['headline', 'fauxHeadline'].includes(type),
    );

    const remainingBlocks = blocks.filter(
      ({ type }) => !['headline', 'fauxHeadline'].includes(type),
    );

    json.content.model.blocks = [headline, bylineBlock, ...remainingBlocks];
  }

  return json;
};

export default addBylineBlock;
