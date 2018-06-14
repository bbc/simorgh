import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
  background-color: #404040;
  color: #fff;
  font-family: ReithSans, Arial, Helvetica, freesans, sans-serif;
  padding: 16px;
`;

const Footer = () => (
  <StyledFooter>
    <span>Copyright &copy; 2018 BBC. The BBC is not responsible for the content of external sites.</span>
  </StyledFooter>
);

export default Footer;
