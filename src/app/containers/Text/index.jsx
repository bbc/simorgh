import React from 'react';
import { textModelPropTypes } from '../../models/propTypes/text';
import Markdown from '../../components/Markdown';

const TextContainer = ({ blocks }) => {
  if (!blocks) return null;

  return blocks.map(({ blockId, model }) => (
    <Markdown key={blockId} {...model} />
  ));
};

TextContainer.propTypes = textModelPropTypes;

export default TextContainer;
