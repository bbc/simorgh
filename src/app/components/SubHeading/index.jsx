import React from 'react';
import { extractText } from '../../helpers/blockHandlers';
import { textDefaultPropTypes } from '../../models/proptypes';
import { headlineModelPropTypes } from '../../models/propTypes/headline';

const SubHeading = ({ blocks }) => {
  const { text } = extractText(blocks);

  if (!text) {
    return null;
  }

  return <h2>{text}</h2>;
};

SubHeading.propTypes = headlineModelPropTypes;

SubHeading.defaultProps = textDefaultPropTypes;

export default SubHeading;
