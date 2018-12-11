import React from 'react';
import paragraph from '../Paragraph';
import Blocks from '../Blocks';
import { textModelPropTypes } from '../../models/propTypes/text';

const componentsToRender = { paragraph };

const TextContainer = ({ blocks }) => {
  if (!blocks) return null;

  return (
    <React.Fragment>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </React.Fragment>
  );
};

TextContainer.propTypes = {
  ...textModelPropTypes,
};

export default TextContainer;
