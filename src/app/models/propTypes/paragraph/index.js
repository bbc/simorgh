import { string, arrayOf, oneOf } from 'prop-types';
import { blockOfSpecificTypeAndModel, blocksWithTypes } from '../general';

const fragmentBlockPropTypes = blockOfSpecificTypeAndModel('fragment', {
  text: string.isRequired,
  attributes: arrayOf(oneOf(['bold', 'italic'])).isRequired,
});

const urlLinkBlockPropTypes = blockOfSpecificTypeAndModel('urlLink', {
  locator: string.isRequired,
  blocks: arrayOf(fragmentBlockPropTypes).isRequired,
});

export const paragraphModelPropTypes = blocksWithTypes([
  fragmentBlockPropTypes,
  urlLinkBlockPropTypes,
]);

export const paragraphBlockPropTypes = blockOfSpecificTypeAndModel(
  'paragraph',
  paragraphModelPropTypes,
);
