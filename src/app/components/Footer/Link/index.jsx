import React from 'react';
import styled from '@emotion/styled';
import { string, bool } from 'prop-types';
import { getSansBold } from '@bbc/psammead-styles/font-styles';
import { C_WHITE } from '@bbc/psammead-styles/colours';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';

const StyledLink = styled.a`
  ${({ service }) => service && getSansBold(service)}
  color: ${C_WHITE};
  display: ${({ inline }) => (inline ? 'inline' : 'block')};
  padding: ${GEL_SPACING} 0 ${GEL_SPACING};
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
