import { blockOfTypesAndModel, blocksWithTypes } from '../general';
import fragmentBlockPropTypes from '../fragment';
import { inlineLinkBlockPropTypes } from '../inlineLink';
import { inlineBlockPropTypes } from '../inline';

export const paragraphModelPropTypes = blocksWithTypes([
  fragmentBlockPropTypes,
  inlineLinkBlockPropTypes,
  inlineBlockPropTypes,
]);

export const paragraphBlockPropTypes = blockOfTypesAndModel(
  ['paragraph'],
  paragraphModelPropTypes,
);
