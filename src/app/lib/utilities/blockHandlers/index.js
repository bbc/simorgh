// blockHandlers.js
// Contains various helper functions for managing props as well as finding specific
// elements and blocks within them

// Filters array of blocks for a single block of given type
const filterForBlockType = (arrayOfBlocks, type) =>
  arrayOfBlocks.filter((block) => (block ? block.type === type : null))[0];

export default filterForBlockType;
