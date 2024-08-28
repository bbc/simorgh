import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import {
  STORY_PAGE,
  CORRESPONDENT_STORY_PAGE,
} from '#routes/utils/pageTypes';
import { insertBlockAfterHeadline } from '../helpers';
import deepClone from '#routes/utils/jsonClone';

const getBylineBlock = json => {
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

const addBylineBlock = originalJson => {
  const json = deepClone(originalJson);
  const pageType = pathOr(null, ['metadata', 'type'], json);
  const blocks = pathOr(null, ['content', 'model', 'blocks'], json);
  const supportedPageTypes = [STORY_PAGE, CORRESPONDENT_STORY_PAGE];

  if (!blocks || !supportedPageTypes.includes(pageType)) {
    return json;
  }

  const bylineBlock = getBylineBlock(json);
  if (bylineBlock) {
    if (bylineBlock.model.blocks[0].name && bylineBlock.model.blocks[0].title) {
      json.content.model.blocks = insertBlockAfterHeadline(bylineBlock, blocks);
    }
  }
  return json;
};

export default addBylineBlock;
