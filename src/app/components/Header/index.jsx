import React from 'react';
import styled from 'styled-components';
import {
  C_POSTBOX,
  C_WHITE,
  FF_NEWS_SANS_REG,
  GEL_SPACING_DBL,
} from '../../../lib/constants/styles';

const Link = styled.a`
  color: ${C_WHITE};
  font-family: ${FF_NEWS_SANS_REG};
  font-size: 2.2em;
  text-decoration: none;
  text-transform: uppercase;
`;

const StyledHeader = styled.header`
  background-color: ${C_POSTBOX};
  height: 40px;
  width: 100%;
  padding: ${GEL_SPACING_DBL};
`;

const Header = () => (
  <StyledHeader role="banner">
    <Link href="http://bbc.co.uk/news">
      BBC News
    </Link>
  </StyledHeader>
);

export default Header;
