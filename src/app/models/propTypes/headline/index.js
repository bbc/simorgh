import { blockOfSpecificTypeAndModel, blocksWithTypes } from '../general';
import { textBlockPropTypes } from '../text';

export const headlineModelPropTypes = blocksWithTypes([
  textBlockPropTypes.isRequired,
]);

export const headlineBlockPropTypes = blockOfSpecificTypeAndModel(
  ['headline', 'subheadline'],
  headlineModelPropTypes,
);
