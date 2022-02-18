import path from 'ramda/src/path';
import splitAt from 'ramda/src/splitAt';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import { getNthCpsParagraphIndex } from '../helpers';
import deepClone from '../../../utils/jsonClone';

const insertExperimentBlock = (experimentBlock, blocks, insertIndex) => {
  const paragraphIndex = getNthCpsParagraphIndex(blocks, insertIndex);

  if (!paragraphIndex) {
    return blocks;
  }

  const parts = splitAt(paragraphIndex + 1, blocks);

  return [...parts[0], { ...experimentBlock }, ...parts[1]];
};

const addExperimentPlaceholderBlocks = service => originalJson => {
  const json = deepClone(originalJson);
  const pageType = path(['metadata', 'type'], json);
  const { allowAdvertising } = path(['metadata', 'options'], json);
  const blocks = path(['content', 'model', 'blocks'], json);

  if (pageType !== STORY_PAGE || !blocks || !allowAdvertising) {
    return json;
  }

  /**
   * Default recommendations for services outside of the experiment
   */

  if (service !== 'hindi') {
    const { assetUri } = path(['metadata', 'locators'], json);

    const defaultRecommendationsBlock = {
      type: 'wsoj',
      model: {
        type: 'recommendations',
        path: `/api/recommend?recSys=2&limit=4&assetUri=${assetUri}`,
      },
    };

    json.content.model.blocks = insertExperimentBlock(
      defaultRecommendationsBlock,
      blocks,
      5,
    );

    return json;
  }

  /**
   * For the Hindi service, we need to insert the experiment blocks into the pageData
   */

  // Control rec block
  const blocks1 = insertExperimentBlock(
    {
      type: 'experimentBlock',
      model: {
        showForVariation: 'control',
      },
    },
    blocks,
    5,
  );

  // Split recs blocks
  const blocks2 = insertExperimentBlock(
    {
      type: 'experimentBlock',
      model: {
        showForVariation: 'variation_a',
        part: 1,
      },
    },
    blocks1,
    5,
  );
  const blocks3 = insertExperimentBlock(
    {
      type: 'experimentBlock',
      model: {
        showForVariation: 'variation_a',
        part: 2,
      },
    },
    blocks2,
    10,
  );

  // Scrollable recs block
  const blocks4 = insertExperimentBlock(
    {
      type: 'experimentBlock',
      model: {
        showForVariation: 'variation_c',
      },
    },
    blocks3,
    5,
  );

  json.content.model.blocks = blocks4;

  return json;
};

export default addExperimentPlaceholderBlocks;
