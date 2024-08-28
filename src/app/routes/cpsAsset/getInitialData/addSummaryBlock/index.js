import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import { singleTextBlock } from '#app/models/blocks';
import { PHOTO_GALLERY_PAGE } from '#routes/utils/pageTypes';
import deepClone from '../../../utils/jsonClone';
import { insertBlockAfterHeadline } from '../helpers';

const getSummary = json => {
  const summary = pathOr(null, ['promo', 'summary'], json);

  if (!summary) {
    return json;
  }

  return summary;
};

const addSummaryBlocks = originalJson => {
  const json = deepClone(originalJson);
  const pageType = path(['metadata', 'type'], json);
  const blocks = path(['content', 'model', 'blocks'], json);

  if (pageType !== PHOTO_GALLERY_PAGE || !blocks) {
    return json;
  }

  const summary = singleTextBlock(getSummary(json));

  json.content.model.blocks = insertBlockAfterHeadline(summary, blocks);

  return json;
};

export default addSummaryBlocks;
