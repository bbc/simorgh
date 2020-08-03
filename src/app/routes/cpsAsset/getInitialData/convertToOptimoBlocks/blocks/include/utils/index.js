export const isAmpSupported = classification =>
  !(
    classification === 'vj-amp-not-supported' ||
    classification === 'idt1-amp' ||
    classification === 'idt1-canonical'
  );

export const getIncludeBlockIndex = (blocks, includeBlock) =>
  blocks.filter(block => block.type === 'include').indexOf(includeBlock);
