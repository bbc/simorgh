import path from 'ramda/src/path';
import splitAt from 'ramda/src/splitAt';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import { getNthCpsParagraphIndex } from '../helpers';
import deepClone from '../../../utils/jsonClone';

const insertExperimentBlock = (experimentBlock, blocks, paragraphIndex) => {
  const paragraphIndex = getNthCpsParagraphIndex(blocks, paragraphIndex);

  if (!paragraphIndex) {
    return blocks;
  }

  const parts = splitAt(paragraphIndex + 1, blocks);

  return [...parts[0], { ...experimentBlock }, ...parts[1]];
};

const addExperimentPlaceholderBlocks = originalJson => {
  const json = deepClone(originalJson);
  const pageType = path(['metadata', 'type'], json);
  const { allowAdvertising } = path(['metadata', 'options'], json);
  const blocks = path(['content', 'model', 'blocks'], json);

  if (pageType !== STORY_PAGE || !blocks || !allowAdvertising) {
    return json;
  }

  const blocks1 = insertExperimentBlock(
    {
      type: 'experimentBlock',
      model: {
        showForVariant: 'control',
        experimentId: 'recommendationsExperiment',
      },
    },
    blocks,
    5,
  );

  const blocks2 = insertExperimentBlock(
    {
      type: 'experimentBlock',
      model: {
        showForVariant: 'variantA',
        experimentId: 'recommendationsExperiment',
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
        showForVariant: 'variantC',
        experimentId: 'recommendationsExperiment',
        part: 2,
      },
    },
    blocks2,
    5,
  );
  const blocks4 = insertExperimentBlock(
    {
      type: 'experimentBlock',
      model: {
        showForVariant: 'variantA',
        experimentId: 'recommendationsExperiment',
      },
    },
    blocks3,
    10,
  );

  json.content.model.blocks = blocks4;

  return json;
};

export default addExperimentPlaceholderBlocks;
