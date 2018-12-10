import React from 'react';
import { string } from 'prop-types';
import paragraph from '../Paragraph';
import Blocks from '../Blocks';
import { textModelPropTypes } from '../../models/propTypes/text';

const componentsToRender = { paragraph };

const TextContainer = ({ blocks, typeOfPreviousBlock }) => {
  if (!blocks) return null;

  return (
    <React.Fragment>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </React.Fragment>
  );
};

TextContainer.propTypes = {
  ...textModelPropTypes,
  typeOfPreviousBlock: string,
};

TextContainer.defaultProps = {
  typeOfPreviousBlock: null,
};

export default TextContainer;
