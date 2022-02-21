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
  let blocks = path(['content', 'model', 'blocks'], json);

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

  const experimentBlocks = [
    // Control recs block
    {
      block: {
        type: 'experimentBlock',
        model: {
          showForVariation: 'control',
        },
      },
      insertIndex: 5,
    },
    // Split recs blocks
    {
      block: {
        type: 'experimentBlock',
        model: {
          showForVariation: 'variation_a',
          part: 1,
        },
      },
      insertIndex: 5,
    },
    {
      block: {
        type: 'experimentBlock',
        model: {
          showForVariation: 'variation_a',
          part: 2,
        },
      },
      insertIndex: 10,
    },
    // Scrollable recs block
    {
      block: {
        type: 'experimentBlock',
        model: {
          showForVariation: 'variation_c',
        },
      },
      insertIndex: 5,
    },
  ];

  experimentBlocks.forEach(({ block, insertIndex }) => {
    blocks = insertExperimentBlock(block, blocks, insertIndex);
  });

  json.content.model.blocks = blocks;

  return json;
};

export default addExperimentPlaceholderBlocks;
