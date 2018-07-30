import { shape, string, oneOf, arrayOf, oneOfType } from 'prop-types';

export const blockObjectOfSpecificTypeAndModel = (type, model) => ({
  blockId: string.isRequired,
  type: oneOf([type]).isRequired,
  model: shape(model).isRequired,
});

export const blockOfSpecificTypeAndModel = (type, model) =>
  shape(blockObjectOfSpecificTypeAndModel(type, model));

export const blocksWithTypes = blockTypes => ({
  blocks: arrayOf(oneOfType(blockTypes).isRequired).isRequired,
});
