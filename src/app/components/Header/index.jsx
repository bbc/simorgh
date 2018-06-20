import React from 'react';
import styled from 'styled-components';
import { C_POSTBOX, C_WHITE, FF_NEWS, SP_16 } from '../../constants';

const Link = styled.a`
  font-family: ${FF_NEWS};
  font-size: 2.2em;
  color: ${C_WHITE};
  text-transform: uppercase;
  text-decoration: none;
`;

const StyledHeader = styled.header`
  background-color: ${C_POSTBOX};
  height: 40px;
  width: 100%;
  padding: ${SP_16};
`;

const Header = () => (
  <StyledHeader role="banner">
    <Link href="http://bbc.co.uk/news">BBC News</Link>
  </StyledHeader>
);

export default Header;
