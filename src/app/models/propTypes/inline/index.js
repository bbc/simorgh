import { string } from 'prop-types';
import { blockOfTypesAndModel, blocksWithTypes } from '../general';
import fragmentBlockPropTypes from '../fragment';

export const inlineModelPropTypes = {
  language: string.isRequired,
  text: string.isRequired,
  ...blocksWithTypes([fragmentBlockPropTypes]),
};

export const inlineBlockPropTypes = blockOfTypesAndModel(
  ['inline'],
  inlineModelPropTypes,
);
