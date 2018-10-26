import { blockOfSpecificTypeAndModel, blocksWithTypes } from '../general';
import fragmentBlockPropTypes from '../fragment';
import { inlineLinkBlockPropTypes } from '../inlineLink';

export const paragraphModelPropTypes = blocksWithTypes([
  fragmentBlockPropTypes,
  inlineLinkBlockPropTypes,
]);

export const paragraphBlockPropTypes = blockOfSpecificTypeAndModel(
  'paragraph',
  paragraphModelPropTypes,
);
