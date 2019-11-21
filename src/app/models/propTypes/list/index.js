import { blockOfTypesAndModel } from '../general';
import { textModelPropTypes } from '../text';

export const listItemBlockPropTypes = blockOfTypesAndModel(
  ['listItem'],
  textModelPropTypes,
);

export const unorderedListBlockPropTypes = blockOfTypesAndModel(
  ['unorderedList'],
  listItemBlockPropTypes,
);

export const orderedListBlockPropTypes = blockOfTypesAndModel(
  ['orderedList'],
  listItemBlockPropTypes,
);

export const listBlockPropTypes = blockOfTypesAndModel(
  ['unorderedList', 'orderedList'],
  listItemBlockPropTypes,
);
