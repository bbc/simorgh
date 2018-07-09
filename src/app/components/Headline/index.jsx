import React from 'react';
import styled from 'styled-components';
import { requiredTextProp } from '../../models/proptypes';
import { C_EBON, FF_NEWS_SANS_REG } from '../../lib/constants/styles';

const StyledHeadline = styled.h1`
  color: ${C_EBON};
  font-family: ${FF_NEWS_SANS_REG};
  font-size: 2em;
`;

const Headline = ({ text }) => <StyledHeadline>{text}</StyledHeadline>;

Headline.propTypes = requiredTextProp;

Headline.defaultProps = {
  text: 'Headline',
};

export default Headline;
