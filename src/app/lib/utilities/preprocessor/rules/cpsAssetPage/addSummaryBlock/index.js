import { singleTextBlock } from '#app/models/blocks';
import pathOr from 'ramda/src/pathOr';
import deepClone from 'ramda/src/clone';
import path from 'ramda/src/path';

const getSummary = json => {
  const summary = pathOr(null, ['promo', 'summary'], json);

  if (!summary) {
    return json;
  }

  return summary;
};

const addSummaryBlocks = originalJson => {
  const json = deepClone(originalJson);
  const type = path(['metadata', 'type'], json);

  const blocks = path(['content', 'model', 'blocks'], json);

  if (!blocks) {
    return json;
  }

  if (type === 'PGL') {
    const headline = blocks.find(({ type }) =>
      ['headline', 'fauxHeadline'].includes(type),
    );

    const summary = singleTextBlock(getSummary(json));

    const remainingBlocks = blocks.filter(({ type }) => {
      return !['headline', 'fauxHeadline'].includes(type);
    });

    json.content.model.blocks = [headline, summary, ...remainingBlocks];
  }

  return json;
};

export default addSummaryBlocks;
