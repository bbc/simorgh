import React from 'react';
import styled from 'styled-components';
import { extractText } from '../../helpers/blockHandlers';
import { textDefaultPropTypes } from '../../models/proptypes';
import { headlineModelPropTypes } from '../../models/propTypes/headline';
import { C_EBON, FF_NEWS_SANS_REG } from '../../lib/constants/styles';

const StyledHeadline = styled.h1`
  color: ${C_EBON};
  font-family: ${FF_NEWS_SANS_REG};
  font-size: 2em;
`;

const HeadlineContainer = ({ blocks }) => {
  const { text } = extractText(blocks);

  if (!text) {
    return null;
  }

  return <StyledHeadline>{text}</StyledHeadline>;
};

HeadlineContainer.propTypes = headlineModelPropTypes;

HeadlineContainer.defaultProps = textDefaultPropTypes;

export default HeadlineContainer;
