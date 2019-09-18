import React from 'react';
import paragraph from '../Paragraph';
import Blocks from '../Blocks';
import { textModelPropTypes } from '#models/propTypes/text';

const componentsToRender = { paragraph };

const TextContainer = ({ blocks }) => {
  if (!blocks) return null;

  return (
    <>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </>
  );
};

TextContainer.propTypes = {
  ...textModelPropTypes,
};

export default TextContainer;
