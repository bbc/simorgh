import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import Markdown from '../../components/Markdown';

const TextContainer = ({ blocks }) => {
  if (!blocks) return null;

  return blocks.map(({ blockId, model }) => (
    <Markdown key={blockId} {...model} />
  ));
};

TextContainer.propTypes = {
  blocks: arrayOf(
    shape({
      blockId: string,
      model: shape({
        text: string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

export default TextContainer;
