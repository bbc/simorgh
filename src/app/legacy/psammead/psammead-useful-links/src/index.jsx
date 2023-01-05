import React from 'react';
import styled from '@emotion/styled';
import { getSerifMedium } from '#psammead/psammead-styles/src/font-styles';
import {
  C_EBON,
  C_METAL,
  C_WHITE,
  C_BLACK,
} from '#psammead/psammead-styles/src/colours';
import { grid } from '#psammead/psammead-styles/src/detection';
import { getPica } from '#psammead/gel-foundations/src/typography';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
} from '#psammead/gel-foundations/src/breakpoints';
import { node, string, shape } from 'prop-types';
import { scriptPropType } from '#psammead/gel-foundations/src/prop-types';

// Focus visible indicator to show around all focusable elements, links, buttons etc, across the WS sites.
const focusIndicatorThickness = '0.1875rem';

const getRowCount = (children, columns) =>
  Math.ceil(React.Children.count(children) / columns);

export const UsefulLink = styled.a`
  ${({ script }) => script && getPica(script)};
  ${({ service }) => service && getSerifMedium(service)};
  color: ${C_EBON};
  text-decoration: none;
  // remove focus
  &:hover {
    text-decoration: underline;
  }

  &:visited {
    color: ${C_METAL};
  }

  // SOLUTION 2 - using focus:not(:focus-visible)
  // Applies all rules to focus state
  &:focus {
    text-decoration: underline;
    display: block;
    outline: ${focusIndicatorThickness} solid ${C_BLACK};
    box-shadow: 0 0 0 ${focusIndicatorThickness} ${C_WHITE};
    outline-offset: ${focusIndicatorThickness};
  }
  //
  // Overrides these rules depending whether focus-visible state is being used, applies different styles to focus and focus-visible
  &:focus:not(:focus-visible) {
    // override display?
    outline: none;
    box-shadow: none;
    outline-offset: 0;
  }
  //
  &:focus-visible {
    display: block;
    outline: ${focusIndicatorThickness} solid ${C_BLACK};
    box-shadow: 0 0 0 ${focusIndicatorThickness} ${C_WHITE};
    outline-offset: ${focusIndicatorThickness};
  }
  // END SOLUTION 2
`;

UsefulLink.propTypes = {
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  href: string.isRequired,
};

export const UsefulLinksUl = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    column-count: 2;
    column-gap: ${GEL_SPACING_DBL};

    @supports (${grid}) {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(
        ${({ children }) => getRowCount(children, 2)},
        auto
      );
      grid-column-gap: ${GEL_SPACING_DBL};
    }
  }
`;

UsefulLinksUl.propTypes = {
  children: node.isRequired,
};

UsefulLinksUl.defaultProps = {
  role: 'list',
};

export const UsefulLinksLi = styled.li`
  padding-top: ${GEL_SPACING};

  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    &:first-child {
      padding-top: 0;
    }
  }

  width: 100%;
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    display: inline-block;

    @supports (${grid}) {
      display: block;
      align-self: start;
      width: initial;
    }
  }
`;

UsefulLinksLi.propTypes = {
  children: node.isRequired,
};

UsefulLinksLi.defaultProps = {
  role: 'listitem',
};
