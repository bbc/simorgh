import {
  blockOfTypesAndModel,
  blocksWithTypes,
  arrayOfSpecificBlocks,
} from '../general';
import { paragraphBlockPropTypes } from '../paragraph';
// import { listBlockPropTypes } from '../list';

export const textModelPropTypes = blocksWithTypes([
  paragraphBlockPropTypes.isRequired,
]);

export const textModelDefaultProps = {
  blocks: [],
};

export const textBlockPropTypes = blockOfTypesAndModel(
  ['text'],
  arrayOfSpecificBlocks(textModelPropTypes),
);
