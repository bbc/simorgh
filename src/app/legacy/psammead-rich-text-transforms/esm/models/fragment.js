var BLOCK_NAME = 'fragment';

var fragment = function fragment(text) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return {
    type: BLOCK_NAME,
    model: {
      text: text,
      attributes: attributes
    }
  };
};

module.exports = fragment;