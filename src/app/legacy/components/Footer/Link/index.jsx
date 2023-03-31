import React from 'react';
import styled from '@emotion/styled';
import { string, bool, func } from 'prop-types';
import { getSansBold } from '#psammead/psammead-styles/src/font-styles';
import { GEL_SPACING_HLF_TRPL } from '#psammead/gel-foundations/src/spacings';

const StyledLink = styled.a`
  ${({ service }) => service && getSansBold(service)}
  color: ${props => props.theme.palette.WHITE};
  display: ${({ inline }) => (inline ? 'inline' : 'block')};
  padding: ${GEL_SPACING_HLF_TRPL} 0 ${GEL_SPACING_HLF_TRPL};
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const Link = ({ service, text, href, inline, lang, onClick }) => (
  <StyledLink
    service={service}
    lang={lang}
    inline={inline}
    href={href}
    className="focusIndicatorInvert"
    onClick={onClick}
  >
    {text}
  </StyledLink>
);

Link.defaultProps = {
  service: null,
  inline: false,
  lang: null,
  onClick: null,
};

Link.propTypes = {
  service: string,
  href: string.isRequired,
  text: string.isRequired,
  lang: string,
  inline: bool,
  onClick: func,
};

export default Link;
