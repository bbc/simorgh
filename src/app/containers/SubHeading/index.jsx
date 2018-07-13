import React from 'react';
import { extractText } from '../../helpers/blockHandlers';
import { textBlockPropTypes } from '../../models/propTypes/text/index';
import { textDefaultPropTypes } from '../../models/proptypes';

const SubHeadingContainer = ({ blocks }) => {
  const { text } = extractText(blocks);

  if (!text) {
    return null;
  }

  return <h2>{text}</h2>;
};

SubHeadingContainer.propTypes = textBlockPropTypes;

SubHeadingContainer.defaultProps = textDefaultPropTypes;

export default SubHeadingContainer;
