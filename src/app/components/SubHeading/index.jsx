import React from 'react';
import { extractText } from '../../helpers/blockHandlers';
import { textBlockPropTypes } from '../../models/propTypes/text';
import { textDefaultPropTypes } from '../../models/propTypes';

const SubHeading = ({ blocks }) => {
  const { text } = extractText(blocks);

  if (!text) {
    return null;
  }

  return <h2>{text}</h2>;
};

SubHeading.propTypes = textBlockPropTypes;

SubHeading.defaultProps = textDefaultPropTypes;

export default SubHeading;
