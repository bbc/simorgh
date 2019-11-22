import { blockOfTypesAndModel, blocksWithTypes } from '../general';
import { paragraphBlockPropTypes } from '../paragraph';

export const listItemModelPropTypes = blockOfTypesAndModel(
  ['listItem'],
  paragraphBlockPropTypes,
);

export const listItemBlockPropTypes = blocksWithTypes([listItemModelPropTypes]);

// export const unorderedListBlockPropTypes = blockOfTypesAndModel(
//   ['unorderedList'],
//   listItemBlockPropTypes,
// );

// export const orderedListBlockPropTypes = blockOfTypesAndModel(
//   ['orderedList'],
//   listItemBlockPropTypes,
// );

// export const listBlockPropTypes = blockOfTypesAndModel(
//   ['unorderedList', 'orderedList'],
//   listItemBlockPropTypes,
// );
