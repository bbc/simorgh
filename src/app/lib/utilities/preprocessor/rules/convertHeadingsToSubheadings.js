import R from 'ramda';

export default payload => {
  const output = R.clone(payload);
  if (
    !payload ||
    !payload.content ||
    !payload.content.blocks ||
    !payload.content.blocks.length
  ) {
    return output;
  }

  output.content.blocks.forEach(block => {
    if (block.type === 'heading') {
      // Not reassigning parameter - working on a deep clone
      // eslint-disable-next-line no-param-reassign
      block.type = 'subheading';
    }
  });

  return output;
};
