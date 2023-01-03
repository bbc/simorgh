import React from 'react';
import styled from '@emotion/styled';
import { string, bool } from 'prop-types';
import { getSansBold } from '#psammead/psammead-styles/src/font-styles';
import { C_BLACK, C_WHITE } from '#psammead/psammead-styles/src/colours';
import { GEL_SPACING_HLF_TRPL } from '#psammead/gel-foundations/src/spacings';

// Focus visible indicator to show around all focusable elements, links, buttons etc, across the WS sites.
const focusIndicatorThickness = '0.1875rem';

const StyledLink = styled.a`
  ${({ service }) => service && getSansBold(service)}
  color: ${C_WHITE};
  display: ${({ inline }) => (inline ? 'inline' : 'block')};
  padding: ${GEL_SPACING_HLF_TRPL} 0 ${GEL_SPACING_HLF_TRPL};
  text-decoration: none;

  // removed focus
  &:hover {
    text-decoration: underline;
  }

  // SOLUTION 2 - using focus:not(:focus-visible)
  // Applies all rules to focus state
  &:focus {
    text-decoration: underline;
    outline: ${focusIndicatorThickness} solid ${C_BLACK};
    box-shadow: 0 0 0 ${focusIndicatorThickness} ${C_WHITE};
    outline-offset: ${focusIndicatorThickness};
  }

  // Overrides these rules depending whether focus-visible state is being used, applies different styles to focus and focus-visible
  &:focus:not(:focus-visible) {
    outline: none;
    box-shadow: none;
    outline-offset: 0;
  }

  &:focus-visible {
    outline: ${focusIndicatorThickness} solid ${C_BLACK};
    box-shadow: 0 0 0 ${focusIndicatorThickness} ${C_WHITE};
    outline-offset: ${focusIndicatorThickness};
  }
  // END SOLUTION 2
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
