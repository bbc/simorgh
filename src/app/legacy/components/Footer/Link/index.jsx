import React from 'react';
import styled from '@emotion/styled';
import { string, bool } from 'prop-types';
import { getSansBold } from '#legacy/psammead-styles/src/font-styles';
import { C_WHITE } from '#legacy/psammead-styles/src/colours';
import { GEL_SPACING_HLF_TRPL } from '#legacy/gel-foundations/src/spacings';

const StyledLink = styled.a`
  ${({ service }) => service && getSansBold(service)}
  color: ${C_WHITE};
  display: ${({ inline }) => (inline ? 'inline' : 'block')};
  padding: ${GEL_SPACING_HLF_TRPL} 0 ${GEL_SPACING_HLF_TRPL};
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const Link = ({ service, text, href, inline, lang }) => (
  <StyledLink service={service} lang={lang} inline={inline} href={href}>
    {text}
  </StyledLink>
);

Link.defaultProps = {
  service: null,
  inline: false,
  lang: null,
};

Link.propTypes = {
  service: string,
  href: string.isRequired,
  text: string.isRequired,
  lang: string,
  inline: bool,
};

export default Link;
