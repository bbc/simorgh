import { clone, path } from 'ramda';

export default payload => {
  const output = clone(payload);

  const blocks = path(['content', 'blocks'], payload);
  if (!Array.isArray(blocks)) {
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
