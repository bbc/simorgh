import React from 'react';
import styled from 'styled-components';
import { containerProp } from '../../models/proptypes';
import { C_EBON, FF_NEWS_SANS_REG } from '../../lib/constants/styles';

const StyledHeadline = styled.h1`
  color: ${C_EBON};
  font-family: ${FF_NEWS_SANS_REG};
  font-size: 2em;
`;

const Headline = ({ text }) => <StyledHeadline>{text}</StyledHeadline>;

Headline.propTypes = containerProp;

Headline.defaultProps = {
  text: 'Hello',
};

export default Headline;
