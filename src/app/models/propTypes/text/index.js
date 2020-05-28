import { blockOfTypesAndModel, blocksWithTypes } from '../general';
import { paragraphBlockPropTypes } from '../paragraph';
import { unorderedListBlockPropTypes } from '../unorderedList';

export const textModelPropTypes = blocksWithTypes([
  paragraphBlockPropTypes.isRequired,
  unorderedListBlockPropTypes.isRequired,
]);

export const textModelDefaultProps = {
  blocks: [],
};

export const textBlockPropTypes = blockOfTypesAndModel(
  ['text'],
  textModelPropTypes,
);
