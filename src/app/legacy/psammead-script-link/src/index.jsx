import React from 'react';
import styled from '@emotion/styled';
import { GEL_SPACING, GEL_SPACING_QUIN } from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';
import { C_WHITE } from '@bbc/psammead-styles/colours';
import { getPica } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { string, shape, node, func } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';

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
