import pathOr from 'ramda/src/pathOr';
import deepClone from 'ramda/src/clone';
import path from 'ramda/src/path';
import { singleTextBlock } from '#app/models/blocks';
import insertBlockAfterHeadline from '../helpers';

const getSummary = (json) => {
  const summary = pathOr(null, ['promo', 'summary'], json);

  if (!summary) {
    return json;
  }

  return summary;
};

const addSummaryBlocks = (originalJson) => {
  const json = deepClone(originalJson);
  const pageType = path(['metadata', 'type'], json);
  const blocks = path(['content', 'model', 'blocks'], json);

  if (pageType !== 'PGL' || !blocks) {
    return json;
  }

  const summary = singleTextBlock(getSummary(json));

  json.content.model.blocks = insertBlockAfterHeadline(summary, blocks);

  return json;
};

export default addSummaryBlocks;
