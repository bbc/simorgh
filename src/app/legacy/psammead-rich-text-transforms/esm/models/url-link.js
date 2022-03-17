var BLOCK_NAME = 'urlLink';

var urlLink = function urlLink(text, locator, blocks, isExternal) {
  return {
    type: BLOCK_NAME,
    model: {
      text: text,
      locator: locator,
      blocks: blocks,
      isExternal: isExternal
    }
  };
};

module.exports = urlLink;