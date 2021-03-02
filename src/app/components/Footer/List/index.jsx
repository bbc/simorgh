import React from 'react';
import styled from '@emotion/styled';
import { string, arrayOf, shape } from 'prop-types';
import { C_SHADOW } from '@bbc/psammead-styles/colours';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MAX,
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { grid } from '@bbc/psammead-styles/detection';

import Link from '../Link';

// Gets the number of grid rows, taking into account the
// trustProjectLink in the grid being separate, on its own row.
const getRowCount = (links, columns, trustProjectLink) =>
  trustProjectLink
    ? Math.ceil(links.length / columns) + 1
    : Math.ceil(links.length / columns);

const StyledList = styled.ul`
  border-bottom: 0.0625rem solid ${C_SHADOW};
  list-style-type: none;
  margin: 0;
  ${({ trustProjectLink }) =>
    trustProjectLink
      ? `padding: 0 0 ${GEL_SPACING};`
      : `padding: ${GEL_SPACING} 0;`}
  column-count: 4;
  @supports (${grid}) {
    display: grid;
    grid-auto-flow: column;
  }
  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    grid-auto-flow: row;
    column-count: 1;
  }
  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    grid-column-gap: ${GEL_SPACING};
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(
      ${({ links, trustProjectLink }) =>
        getRowCount(links, 2, trustProjectLink)},
      auto
    );
    column-count: 2;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    grid-column-gap: ${GEL_SPACING_DBL};
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(
      ${({ links, trustProjectLink }) =>
        getRowCount(links, 3, trustProjectLink)},
      auto
    );
    column-count: 3;
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    grid-column-gap: ${GEL_SPACING_DBL};
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(
      ${({ links, trustProjectLink }) =>
        getRowCount(links, 4, trustProjectLink)},
      auto
    );
    column-count: 4;
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-column-gap: ${GEL_SPACING_DBL};
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(
      ${({ links, trustProjectLink }) =>
        getRowCount(links, 5, trustProjectLink)},
      auto
    );
    column-count: 5;
  }
  ${({ trustProjectLink }) =>
    trustProjectLink &&
    `> li:first-of-type {
    border-bottom: 0.0625rem solid ${C_SHADOW};
    padding: ${GEL_SPACING} 0;
    margin-bottom: ${GEL_SPACING};
    grid-column: 1/-1;
    width: 100%;
    column-span: all;
  }`}
`;

const StyledListItem = styled.li`
  min-width: 50%;
  column-gap: ${GEL_SPACING_DBL};
  break-inside: avoid-column;
`;

const listItem = (key, text, href, lang) => (
  <StyledListItem key={key} role="listitem">
    <Link text={text} href={href} lang={lang} />
  </StyledListItem>
);

const List = ({ links, trustProjectLink }) => (
  <StyledList role="list" trustProjectLink={trustProjectLink} links={links}>
    {trustProjectLink &&
      listItem(
        trustProjectLink.text,
        trustProjectLink.text,
        trustProjectLink.href,
      )}
    {links.map(link => listItem(link.text, link.text, link.href, link.lang))}
  </StyledList>
);

const linkPropTypes = shape({
  href: string.isRequired,
  text: string.isRequired,
  lang: string,
});

List.propTypes = {
  links: arrayOf(linkPropTypes.isRequired).isRequired,
  trustProjectLink: linkPropTypes,
};

List.defaultProps = { trustProjectLink: null };

export default List;
