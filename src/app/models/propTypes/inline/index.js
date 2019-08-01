import { string } from 'prop-types';
import { blockOfTypesAndModel, blocksWithTypes } from '../general';
import fragmentBlockPropTypes from '../fragment';
import { inlineLinkBlockPropTypes } from '../inlineLink';

export const inlineBlocksPropTypes = blocksWithTypes([
  fragmentBlockPropTypes,
  inlineLinkBlockPropTypes,
]);

export const inlineModelPropTypes = {
  language: string.isRequired,
  text: string.isRequired,
  blocks: inlineBlocksPropTypes,
};

export const inlineBlockPropTypes = blockOfTypesAndModel(
  ['inline'],
  inlineModelPropTypes,
);
