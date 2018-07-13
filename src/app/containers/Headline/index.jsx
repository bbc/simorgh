import React from 'react';
import { extractText } from '../../helpers/blockHandlers';
import { textDefaultPropTypes } from '../../models/proptypes';
import { headlineModelPropTypes } from '../../models/propTypes/headline';
import Headline from '../../components/Headline';

const HeadlineContainer = ({ blocks }) => {
  const { text } = extractText(blocks);

  if (!text) {
    return null;
  }

  return <Headline>{text}</Headline>;
};

HeadlineContainer.propTypes = headlineModelPropTypes;

HeadlineContainer.defaultProps = textDefaultPropTypes;

export default HeadlineContainer;
