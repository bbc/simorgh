import { string } from 'prop-types';
import { blockOfSpecificTypeAndModel, blocksWithTypes } from '../general';

export const textModelPropTypes = blocksWithTypes([
  blockOfSpecificTypeAndModel('paragraph', {
    text: string.isRequired,
  }),
]);

export const textModelDefaultProps = {
  blocks: [],
};

export const textBlockPropTypes = blockOfSpecificTypeAndModel(
  'text',
  textModelPropTypes,
);
