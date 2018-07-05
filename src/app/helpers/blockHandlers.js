// blockHandlers.js
// Contains various helper functions for managing props as well as finding specific
// elements and blocks within them

// Filters array of blocks for a single block of given type
export const filterForBlockType = (arrayOfBlocks, type) =>
  arrayOfBlocks.filter(block => (block ? block.type === type : null))[0];

export const extractText = arrayOfBlocks =>
  arrayOfBlocks[0].model.blocks[0].model;
