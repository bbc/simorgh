import { string } from 'prop-types';
import { blockOfValidTypeAndModel, blocksWithTypes } from '../general';
import fragmentBlockPropTypes from '../fragment';

export const inlineLinkModelPropTypes = {
  locator: string.isRequired,
  ...blocksWithTypes([fragmentBlockPropTypes]),
};

export const inlineLinkBlockPropTypes = blockOfValidTypeAndModel(
  ['urlLink'],
  inlineLinkModelPropTypes,
);
