import React from 'react';
import styled from 'styled-components';
import {
  C_POSTBOX,
  GEL_SPACING_DBL,
  C_WHITE,
} from '../../lib/constants/styles';

const StyledHeader = styled.header`
  background-color: ${C_POSTBOX};
  height: 80px;
  width: 100%;
  padding: ${GEL_SPACING_DBL}px;

  a:focus {
    text-decoration: none;
    border-bottom: 4px solid ${C_WHITE};
  }
`;

const Header = () => (
  <StyledHeader role="banner" aria-label="BBC News">
    <a href="https://www.bbc.co.uk/news">BBC News</a>
  </StyledHeader>
);

export default Header;
