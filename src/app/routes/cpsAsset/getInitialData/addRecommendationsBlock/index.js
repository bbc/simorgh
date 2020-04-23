import path from 'ramda/src/path';
import deepClone from 'ramda/src/clone';
import splitAt from 'ramda/src/splitAt';
import { getNthCpsParagraphIndex } from '../helpers';

const insertRecommendationsBlock = (recommendationBlock, blocks) => {
  // get the index of the 5th paragraph
  const fifthParagraphIndex = getNthCpsParagraphIndex(blocks, 5);

  if (!fifthParagraphIndex) {
    return blocks;
  }

  // split blocks at the index of the 5th paragraph
  const parts = splitAt(fifthParagraphIndex + 1, blocks);

  // reconstruct blocks
  return [...parts[0], { ...recommendationBlock }, ...parts[1]];
};

const addRecommendationsBlock = originalJson => {
  const json = deepClone(originalJson);
  const pageType = path(['metadata', 'type'], json);
  const { allowAdvertising } = path(['metadata', 'options'], json);
  const blocks = path(['content', 'model', 'blocks'], json);

  if (pageType !== 'STY' || !blocks || !allowAdvertising) {
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
