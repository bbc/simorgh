import React from 'react';
import styled from '@emotion/styled';
import { getSerifMedium } from '#psammead/psammead-styles/src/font-styles';
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

const getRowCount = (children, columns) =>
  Math.ceil(React.Children.count(children) / columns);

export const UsefulLink = styled.a`
  ${({ script }) => script && getPica(script)};
  ${({ service }) => service && getSerifMedium(service)};
  color: ${props => props.theme.palette.EBON};
  text-decoration: none;
  &:hover,
  &:focus {
    text-decoration: underline;
  }

  &:visited {
    color: ${props => props.theme.palette.METAL};
  }
`;

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

UsefulLinksLi.defaultProps = {
  role: 'listitem',
};
