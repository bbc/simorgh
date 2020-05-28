import { blockOfTypesAndModel, blocksWithTypes } from '../general';
import { paragraphBlockPropTypes } from '../paragraph';

export const listItemModelPropTypes = blocksWithTypes([
  paragraphBlockPropTypes.isRequired,
]);

export const listItemModelDefaultProps = {
  blocks: [],
};

export const listItemBlockPropTypes = blockOfTypesAndModel(
  ['listItem'],
  listItemModelPropTypes,
);
