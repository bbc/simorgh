import { blockOfTypesAndModel, blocksWithTypes } from '../general';
import { textBlockPropTypes } from '../text';

export const headlineModelPropTypes = blocksWithTypes([
  textBlockPropTypes.isRequired,
]);

export const headlineBlockPropTypes = blockOfTypesAndModel(
  ['headline', 'subheadline'],
  headlineModelPropTypes,
);
