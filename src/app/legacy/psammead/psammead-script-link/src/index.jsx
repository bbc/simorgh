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
import { getPica } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';

const StyledLink = styled.a`
  ${({ script }) => script && getPica(script)}
  ${({ service }) => service && getSansRegular(service)}
  display: inline-block;
  color: ${props => props.theme.palette.WHITE};
  text-decoration: none;
  height: 2.25rem;
  border: 0.0625rem solid ${props => props.theme.palette.WHITE};
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
    border: 0.1875rem solid ${props => props.theme.palette.WHITE};
  }
  /* stylelint-enable */

  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    line-height: calc(${GEL_SPACING_QUIN} - ${GEL_SPACING});
  }
`;
const noopFunction = () => {};

const ScriptLink = ({
  children,
  script,
  service,
  href,
  variant = null,
  onClick = noopFunction,
}) => (
  <StyledLink
    script={script}
    service={service}
    href={href}
    data-variant={variant}
    onClick={onClick}
    className="focusIndicatorRemove"
  >
    <StyledSpan>{children}</StyledSpan>
  </StyledLink>
);

export default ScriptLink;
