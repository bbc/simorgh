import React from 'react';
import styled from 'styled-components';
import { string, boolean } from 'prop-types';
import {
  C_WHITE,
  GEL_SPACING_ALT,
  GEL_SPACING_HLF,
} from '../../lib/constants/styles';

const StyledLink = styled.a`
  padding: ${GEL_SPACING_ALT} 0;
  color: ${C_WHITE};
  font-weight: 700; /* Used instead of Reith Sans Bold since it is not worth the performance cost in this case. */
  text-decoration: none;
  padding-bottom: ${GEL_SPACING_HLF};
  display: ${({ inline }) => (inline ? 'inline' : 'block')};
`;

const StyleLinkText = styled.span`
  ${StyledLink}:hover &,
  ${StyledLink}:focus {
    padding-bottom: 2px;
    border-bottom: 2px solid ${C_WHITE};
  }
`;

const Link = ({ text, href, inline }) => (
  <StyledLink inline={inline} href={href}>
    <StyleLinkText>{text}</StyleLinkText>
  </StyledLink>
);

Link.defaultProps = {
  inline: false,
};

Link.propTypes = {
  href: string.isRequired,
  text: string.isRequired,
  inline: boolean,
};

export default Link;
