import React from 'react';
import styled from 'styled-components';
import {
  C_POSTBOX,
  C_WHITE,
  GEL_SPACING_DBL,
  GEL_SPACING_HLF,
} from '../../lib/constants/styles';

const StyledHeader = styled.header`
  background-color: ${C_POSTBOX};
  height: 80px;
  width: 100%;
  padding: ${GEL_SPACING_DBL}px;
`;
const StyledLink = styled.a`
  :focus {
    text-decoration: none;
    border-bottom: ${GEL_SPACING_HLF}px solid ${C_WHITE};
  }
`;

const Header = () => (
  <StyledHeader role="banner">
    <StyledLink href="https://www.bbc.co.uk/news">BBC News</StyledLink>
  </StyledHeader>
);

export default Header;
