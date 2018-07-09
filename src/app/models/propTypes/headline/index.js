import { blockOfSpecificTypeAndModel, blocksWithTypes } from '../general';
import { textBlockPropTypes } from '../text';

export const headlineModelPropTypes = blocksWithTypes([textBlockPropTypes]);

export const headlineBlockPropTypes = blockOfSpecificTypeAndModel(
  'headline',
  headlineModelPropTypes,
);
