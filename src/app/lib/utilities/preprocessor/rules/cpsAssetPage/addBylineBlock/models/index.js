const convertToBylineBlock = block => ({
  model: {
    blocks: [block],
  },
  type: 'byline',
});

export default convertToBylineBlock;
