import { string, arrayOf, oneOf } from 'prop-types';
import { blockOfSpecificTypeAndModel, blocksWithTypes } from '../general';

const fragmentBlockPropTypes = blockOfSpecificTypeAndModel('fragment', {
  text: string.isRequired,
  attributes: arrayOf(oneOf(['bold', 'italic'])).isRequired,
});

export const paragraphModelPropTypes = blocksWithTypes([
  fragmentBlockPropTypes,
]);

export const paragraphBlockPropTypes = blockOfSpecificTypeAndModel(
  'paragraph',
  paragraphModelPropTypes,
);
