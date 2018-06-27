// blockHelpers.js
// Contain various helper functions for managing props as well as findinging specific
// elements and blocks within them

// Filters array of blocks for a single block of given type
const filterForBlockType = (arrayOfBlocks, type) =>
  arrayOfBlocks.filter(block => block.type === type)[0];

export default filterForBlockType;