import { blockOfTypesAndModel, blocksWithTypes } from '../general';
import { listItemBlockPropTypes } from '../listItem';

export const unorderedListModelPropTypes = blocksWithTypes([
  listItemBlockPropTypes.isRequired,
]);

export const unorderedListModelDefaultProps = {
  blocks: [],
};

export const unorderedListBlockPropTypes = blockOfTypesAndModel(
  ['unorderedList'],
  unorderedListModelPropTypes,
);
