import React from 'react';
import styled from 'styled-components';
import {
  C_STORM,
  C_WHITE,
  FF_NEWS_SANS_REG,
  GEL_SPACING_DBL,
} from '../../../lib/constants/styles';

const StyledFooter = styled.footer`
  background-color: ${C_STORM};
  font-family: ${FF_NEWS_SANS_REG};
  padding: ${GEL_SPACING_DBL};
`;

const StyledParagraph = styled.p`
  color: ${C_WHITE};
`;

const Footer = () => (
  <StyledFooter role="contentinfo">
    <StyledParagraph>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      Copyright &copy; {new Date().getFullYear()} BBC. The BBC is not
      responsible for the content of external sites.
    </StyledParagraph>
  </StyledFooter>
);

export default Footer;
