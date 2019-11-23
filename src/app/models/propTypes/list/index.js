import {
  blockOfTypesAndModel,
  blocksWithTypes,
  arrayOfSpecificBlocks,
} from '../general';
import { paragraphBlockPropTypes } from '../paragraph';

export const listItemPropTypes = blocksWithTypes([
  paragraphBlockPropTypes.isRequired,
]);

export const listItemModelPropTypes = blockOfTypesAndModel(
  ['listItem'],
  arrayOfSpecificBlocks(paragraphBlockPropTypes),
);

export const listPropTypes = blocksWithTypes([
  listItemModelPropTypes.isRequired,
]);

export const unorderedListBlockPropTypes = blockOfTypesAndModel(
  ['unorderedList'],
  arrayOfSpecificBlocks(listPropTypes),
);

export const orderedListBlockPropTypes = blockOfTypesAndModel(
  ['orderedList'],
  arrayOfSpecificBlocks(listPropTypes),
);

export const listBlockPropTypes = blockOfTypesAndModel(
  ['unorderedList', 'orderedList'],
  arrayOfSpecificBlocks(listPropTypes),
);
