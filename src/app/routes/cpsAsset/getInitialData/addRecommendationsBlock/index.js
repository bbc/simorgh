import path from 'ramda/src/path';
import splitAt from 'ramda/src/splitAt';
import { STORY_PAGE } from '#routes/utils/pageTypes';
import deepClone from '#routes/utils/jsonClone';
import { getNthCpsParagraphIndex } from '../helpers';

const insertRecommendationsBlock = (recommendationBlock, blocks) => {
  const fifthParagraphIndex = getNthCpsParagraphIndex(blocks, 5);

  if (!fifthParagraphIndex) {
    return blocks;
  }

  const parts = splitAt(fifthParagraphIndex + 1, blocks);

  return [...parts[0], { ...recommendationBlock }, ...parts[1]];
};

const addRecommendationsBlock = originalJson => {
  const json = deepClone(originalJson);
  const pageType = path(['metadata', 'type'], json);
  const { allowAdvertising } = path(['metadata', 'options'], json);
  const blocks = path(['content', 'model', 'blocks'], json);

  if (pageType !== STORY_PAGE || !blocks || !allowAdvertising) {
    return json;
  }

  const { assetUri } = path(['metadata', 'locators'], json);

  const block = {
    type: 'wsoj',
    model: {
      type: 'recommendations',
      path: `/api/recommend?recSys=2&limit=4&assetUri=${assetUri}`,
    },
  };

  json.content.model.blocks = insertRecommendationsBlock(block, blocks);

  return json;
};

export default addRecommendationsBlock;
