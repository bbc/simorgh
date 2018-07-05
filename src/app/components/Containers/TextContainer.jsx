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
  const extractType = blocks.type;
  const passingText = blocks.model.blocks[0].model.blocks[0].model;

  if (!passingText) {
    return null;
  }

  const BlockType = Blocks[extractType];
  return <BlockType {...passingText} />;
};

TextContainer.propTypes = commonTextPropTypes;

TextContainer.defaultProps = baseTextDefaultPropTypes(
  'headline',
  'A Glorious test',
);

export default TextContainer;
