import { shape, string, oneOf, arrayOf, oneOfType } from 'prop-types';

export const blockOfSpecificTypeAndModel = (type, model) =>
  shape({
    blockId: string.isRequired,
    type: oneOf([type]).isRequired,
    model: shape(model).isRequired,
  });

export const blocksWithTypes = blockTypes => ({
  blocks: arrayOf(oneOfType(blockTypes).isRequired).isRequired,
});
