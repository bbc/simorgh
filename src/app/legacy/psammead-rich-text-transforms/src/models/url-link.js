const BLOCK_NAME = 'urlLink';

const urlLink = (text, locator, blocks, isExternal) => {
  return {
    type: BLOCK_NAME,
    model: { text, locator, blocks, isExternal },
  };
};

export default urlLink;
