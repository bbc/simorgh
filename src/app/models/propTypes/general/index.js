import { shape, string, oneOf, arrayOf, oneOfType } from 'prop-types';

export const blockOfSpecificTypeAndModel = (typeEnum, model) =>
  shape({
    blockId: string.isRequired,
    type: oneOf([typeEnum]).isRequired,
    model: shape(model).isRequired,
  });

export const blocksWithTypes = blockTypes => ({
  blocks: arrayOf(oneOfType(blockTypes).isRequired).isRequired,
});
