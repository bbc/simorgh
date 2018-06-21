import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: #404040;
  font-family: ReithSans, Arial, Helvetica, freesans, sans-serif;
  padding: 16px;
`;

const StyledParagraph = styled.p`
  color: #fff;
`;

const Footer = () => (
  <StyledFooter role="contentinfo">
    <StyledParagraph>
      Copyright &copy; {new Date().getFullYear()} BBC. The BBC is not
      responsible for the content of external sites.
    </StyledParagraph>
  </StyledFooter>
);

export default Footer;
