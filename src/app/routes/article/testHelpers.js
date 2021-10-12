export const findBlock = (id, blocks) => {
  if (!blocks || !blocks.length) return null;

  for (let i = 0; i < blocks.length; i += 1) {
    if (blocks[i].id === id) return blocks[i];
    const recursiveResult = findBlock(id, blocks[i].model?.blocks);
    if (recursiveResult) return recursiveResult;
  }
  return null;
};

export const validateBlockIncluded = id => blocks => {
  expect(findBlock(id, blocks)).toBeTruthy();
  return blocks;
};

export const validateBlocksIncluded =
  (...ids) =>
  blocks => {
    ids.forEach(id => validateBlockIncluded(id)(blocks));
    return blocks;
  };

export const validateBlockExcluded = id => blocks => {
  expect(findBlock(id, blocks)).toBeFalsy();
  return blocks;
};

export const validateBlocksExcluded =
  (...ids) =>
  blocks => {
    ids.forEach(id => validateBlockExcluded(id)(blocks));
    return blocks;
  };
