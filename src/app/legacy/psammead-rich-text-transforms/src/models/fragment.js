const BLOCK_NAME = 'fragment';

const fragment = (text, attributes = []) => ({
  type: BLOCK_NAME,
  model: {
    text,
    attributes,
  },
});

module.exports = fragment;
