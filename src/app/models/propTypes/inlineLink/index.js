import { string } from 'prop-types';
import { blockOfTypesAndModel, blocksWithTypes } from '../general';
import fragmentBlockPropTypes from '../fragment';

export const inlineLinkModelPropTypes = {
  locator: string.isRequired,
  ...blocksWithTypes([fragmentBlockPropTypes]),
};

export const inlineLinkBlockPropTypes = blockOfTypesAndModel(
  ['urlLink'],
  inlineLinkModelPropTypes,
);
