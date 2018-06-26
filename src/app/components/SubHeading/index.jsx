import React from 'react';
import { textPropTypes, textDefaultPropTypes } from '../../proptypes';

const SubHeading = ({ blocks }) => {
  const { text } = blocks[0].model.blocks[0].model;

  return (
    <h2>
      {text}
    </h2>
  );
};

SubHeading.propTypes = textPropTypes;

SubHeading.defaultProps = textDefaultPropTypes;

export default SubHeading;
