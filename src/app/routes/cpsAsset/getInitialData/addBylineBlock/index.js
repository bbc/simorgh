import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import deepClone from 'ramda/src/clone';
import insertBlockAfterHeadline from '../helpers';

const getBylineBlock = (json) => {
  const byline = pathOr(null, ['promo', 'byline'], json);

  if (!byline) {
    return null;
  }

  const bylineBlock = {
    model: {
      blocks: [
        {
          name:
            path(['name'], byline) ||
            pathOr(null, ['persons', '0', 'name'], byline),
          title:
            path(['title'], byline) ||
            pathOr(null, ['persons', '0', 'function'], byline),
        },
      ],
    },
    type: 'byline',
  };

  return bylineBlock;
};

const addBylineBlock = (originalJson) => {
  const json = deepClone(originalJson);
  const pageType = pathOr(null, ['metadata', 'type'], json);

  const blocks = pathOr(null, ['content', 'model', 'blocks'], json);

  if (!blocks || pageType !== 'STY') {
    return json;
  }

  const bylineBlock = getBylineBlock(json);
  if (bylineBlock) {
    json.content.model.blocks = insertBlockAfterHeadline(bylineBlock, blocks);
  }

  return json;
};

export default addBylineBlock;
