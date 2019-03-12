import { string, bool } from 'prop-types';
import { blockOfTypesAndModel, blocksWithTypes } from '../general';
import fragmentBlockPropTypes from '../fragment';

export const inlineLinkModelPropTypes = {
  locator: string.isRequired,
  isExternal: bool.isRequired,
  ...blocksWithTypes([fragmentBlockPropTypes]),
};

export const inlineLinkBlockPropTypes = blockOfTypesAndModel(
  ['urlLink'],
  inlineLinkModelPropTypes,
);
