import deepClone from '../../../lib/utilities/deepClone';

const recursiveAttributeFilter = block => {
  if (block.model.attributes && block.model.attributes.length > 0) {
    const newBlock = Object.assign({}, block);
    newBlock.model.attributes = block.model.attributes.filter(
      attribute => attribute !== 'italic',
    );
    return newBlock;
  }
  if (block.model.blocks) {
    return block.model.blocks.filter(innerBlock =>
      recursiveAttributeFilter(innerBlock),
    );
  }
  return block;
};

const removeItalicAttribute = blocks => {
  const newBlock = deepClone(blocks);
  return newBlock.filter(block => {
    return recursiveAttributeFilter(block);
  });
};

export default removeItalicAttribute;
