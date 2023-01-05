import React from 'react';
import styled from '@emotion/styled';
import {
  GEL_SPACING,
  GEL_SPACING_QUIN,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
} from '#psammead/gel-foundations/src/breakpoints';
import { C_WHITE, C_BLACK } from '#psammead/psammead-styles/src/colours';
import { getPica } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { string, shape, node, func } from 'prop-types';
import { scriptPropType } from '#psammead/gel-foundations/src/prop-types';

// Focus visible indicator to show around all focusable elements, links, buttons etc, across the WS sites.
const focusIndicatorThickness = '0.1875rem';

const StyledLink = styled.a`
  ${({ script }) => script && getPica(script)}
  ${({ service }) => service && getSansRegular(service)}
  display: inline-block;
  color: ${C_WHITE};
  text-decoration: none;
  height: 2.25rem;
  border: 0.0625rem solid ${C_WHITE};
  margin: ${GEL_SPACING} 0 ${GEL_SPACING} ${GEL_SPACING};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    line-height: calc(2.25rem - ${GEL_SPACING});
  }

  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    height: ${GEL_SPACING_QUIN};
  }
  &:focus {
    outline: ${focusIndicatorThickness} solid ${C_BLACK};
    box-shadow: 0 0 0 ${focusIndicatorThickness} ${C_WHITE};
    outline-offset: ${focusIndicatorThickness};
  }
  &:focus:not(:focus-visible) {
    outline: none;
    box-shadow: none;
    outline-offset: 0;

  &:focus-visible {
    outline: ${focusIndicatorThickness} solid ${C_BLACK};
    box-shadow: 0 0 0 ${focusIndicatorThickness} ${C_WHITE};
    outline-offset: ${focusIndicatorThickness};
  }
`;

const StyledSpan = styled.span`
  margin: 0.1875rem;
  display: inline-block;
  height: calc(100%);
  padding: 0 ${GEL_SPACING};

  /* stylelint-disable */
  ${StyledLink}:hover &,
  ${StyledLink}:focus & {
    margin: 0;
    border: 0.1875rem solid ${C_WHITE};
  }
  /* stylelint-enable */

  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    line-height: calc(${GEL_SPACING_QUIN} - ${GEL_SPACING});
  }
`;

const ScriptLink = ({ children, script, service, href, variant, onClick }) => (
  <StyledLink
    script={script}
    service={service}
    href={href}
    data-variant={variant}
    onClick={onClick}
  >
    <StyledSpan>{children}</StyledSpan>
  </StyledLink>
);

const noopFunction = () => {};

ScriptLink.defaultProps = {
  variant: null,
  onClick: noopFunction,
};

ScriptLink.propTypes = {
  children: node.isRequired,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  href: string.isRequired,
  variant: string,
  onClick: func,
};

export default ScriptLink;
