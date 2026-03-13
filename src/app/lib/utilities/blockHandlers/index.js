// blockHandlers.js
// Contains various helper functions for managing props as well as finding specific
// elements and blocks within them

// filters an array of blocks for a given type and Returns the first match by default
const filterForBlockType = (arrayOfBlocks, type) =>
  arrayOfBlocks?.filter(block => block?.type === type)?.[0];

export default filterForBlockType;
