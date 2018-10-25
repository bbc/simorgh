import { string } from 'prop-types';
import { blockOfSpecificTypeAndModel, blocksWithTypes } from '../general';
import fragmentBlockPropTypes from '../fragment';

export const inlineLinkModelPropTypes = {
  locator: string.isRequired,
  ...blocksWithTypes([fragmentBlockPropTypes]),
};

export const inlineLinkBlockPropTypes = blockOfSpecificTypeAndModel(
  ['urlLink'],
  inlineLinkModelPropTypes,
);
