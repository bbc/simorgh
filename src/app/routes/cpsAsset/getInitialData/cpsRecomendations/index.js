import path from 'ramda/src/path';
import deepClone from 'ramda/src/clone';
import splitAt from 'ramda/src/splitAt';

const isCpsParagraphBlock = cpsBlock => {
  if (cpsBlock.type === 'text') {
    const paragraphBlocks = path(['model', 'blocks'], cpsBlock).filter(
      block => block.type === 'paragraph',
    );
    return !!paragraphBlocks.length;
  }
  return false;
};

const getNthCpsParagraphIndex = (blocks, n) => {
  let indexCount = 0; // maybe make it the lastt block just incase there's no paragraph blocks
  let paragraphCount = 0;
  blocks.some((block, index) => {
    if (isCpsParagraphBlock(block)) {
      paragraphCount += 1;
    }
    if (paragraphCount === n) {
      indexCount = index;
      return true;
    }
    return false;
  });
  return indexCount;
};

const insertRecommendationsBlock = (recommendationBlock, blocks) => {
  // get the index of the 5th paragraph
  const recommendationIndex = getNthCpsParagraphIndex(blocks, 5) + 1;

  // split blocks at the index of the 5th paragraph
  const parts = splitAt(recommendationIndex, blocks);

  // reconstruct blocks
  return [...parts[0], { ...recommendationBlock }, ...parts[1]];
};

const cpsRecommendations = originalJson => {
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
      assetUri,
    },
  };

  json.content.model.blocks = insertRecommendationsBlock(block, blocks);

  return json;
};

export default cpsRecommendations;
