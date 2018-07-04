import React from 'react';
import styled from 'styled-components';
import { extractText } from '../../helpers/blockHandlers';
import { textPropTypes, textDefaultPropTypes } from '../../models/proptypes';
import { C_EBON, FF_NEWS_SANS_REG } from '../../lib/constants/styles';

const StyledHeadline = styled.h1`
  color: ${C_EBON};
  font-family: ${FF_NEWS_SANS_REG};
  font-size: 2em;
`;

const Headline = ({ blocks }) => {
  const { text } = extractText(blocks);

  if (!text) {
    return null;
  }

  return <StyledHeadline>{text}</StyledHeadline>;
};

Headline.propTypes = textPropTypes;

Headline.defaultProps = textDefaultPropTypes;

export default Headline;
