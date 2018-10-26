import { blockOfValidTypeAndModel, blocksWithTypes } from '../general';
import { paragraphBlockPropTypes } from '../paragraph';

export const textModelPropTypes = blocksWithTypes([
  paragraphBlockPropTypes.isRequired,
]);

export const textModelDefaultProps = {
  blocks: [],
};

export const textBlockPropTypes = blockOfValidTypeAndModel(
  ['text'],
  textModelPropTypes,
);
