import { blockOfValidTypeAndModel, blocksWithTypes } from '../general';
import { textBlockPropTypes } from '../text';

export const headlineModelPropTypes = blocksWithTypes([
  textBlockPropTypes.isRequired,
]);

export const headlineBlockPropTypes = blockOfValidTypeAndModel(
  ['headline', 'subheadline'],
  headlineModelPropTypes,
);
