import { string } from 'prop-types';
import { blockOfSpecificTypeAndModel, blocksWithTypes } from '../general';

const paragraphBlock = blockOfSpecificTypeAndModel('paragraph', {
  text: string.isRequired,
});

export const textModelPropTypes = blocksWithTypes([paragraphBlock.isRequired]);

export const textModelDefaultProps = {
  blocks: [],
};

export const textBlockNewPropTypes = blockOfSpecificTypeAndModel(
  'text',
  textModelPropTypes,
);
