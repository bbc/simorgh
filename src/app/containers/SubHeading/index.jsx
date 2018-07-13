import React from 'react';
import { extractText } from '../../helpers/blockHandlers';
import { textBlockPropTypes } from '../../models/propTypes/text/index';
import { textDefaultPropTypes } from '../../models/proptypes';
import SubHeading from '../../components/SubHeading';

const SubHeadingContainer = ({ blocks }) => {
  const { text } = extractText(blocks);

  if (!text) {
    return null;
  }

  return <SubHeading>{text}</SubHeading>;
};

SubHeadingContainer.propTypes = textBlockPropTypes;

SubHeadingContainer.defaultProps = textDefaultPropTypes;

export default SubHeadingContainer;
