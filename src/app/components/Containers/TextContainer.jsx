import React from 'react';
import Headline from '../Headline';
import SubHeading from '../SubHeading';
import {
  commonTextPropTypes,
  baseTextDefaultPropTypes,
} from '../../models/proptypes';

const Blocks = {
  headline: Headline,
  subheading: SubHeading,
};

const TextContainer = blocks => {
  const { type } = blocks;
  const text = blocks.model.blocks[0].model.blocks[0].model;

  if (!type || !text) {
    return null;
  }

  const BlockType = Blocks[type];
  return <BlockType {...text} />;
};

TextContainer.propTypes = commonTextPropTypes;

TextContainer.defaultProps = baseTextDefaultPropTypes('', '');

export default TextContainer;
