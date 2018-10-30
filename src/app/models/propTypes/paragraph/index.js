import { blockOfTypesAndModel, blocksWithTypes } from '../general';
import fragmentBlockPropTypes from '../fragment';
import { inlineLinkBlockPropTypes } from '../inlineLink';

export const paragraphModelPropTypes = blocksWithTypes([
  fragmentBlockPropTypes,
  inlineLinkBlockPropTypes,
]);

export const paragraphBlockPropTypes = blockOfTypesAndModel(
  ['paragraph'],
  paragraphModelPropTypes,
);
