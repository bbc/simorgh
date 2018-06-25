import React from 'react';
import { textPropTypes, textDefaultPropTypes } from '../../proptypes';

const Headline = ({ blocks }) => {
  const { text } = blocks[0].model.blocks[0].model;

  return <h1>{text}</h1>;
};

Headline.propTypes = textPropTypes;

Headline.defaultProps = textDefaultPropTypes;

export default Headline;
