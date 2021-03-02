import React from 'react';
import styled from '@emotion/styled';
import { string, arrayOf, shape, element } from 'prop-types';
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
const getRowCount = (itemCount, columns, trustProjectLink) =>
  trustProjectLink
    ? Math.ceil(itemCount / columns) + 1
    : Math.ceil(itemCount / columns);

const StyledList = styled.ul`
  border-bottom: 0.0625rem solid ${C_SHADOW};
  column-count: 4;
  margin: 0;
  list-style-type: none;
  ${({ trustProjectLink }) =>
    trustProjectLink
      ? `padding: 0 0 ${GEL_SPACING};`
      : `padding: ${GEL_SPACING} 0;`}

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
      ${({ itemCount, trustProjectLink }) =>
        getRowCount(itemCount, 2, trustProjectLink)},
      auto
    );
    column-count: 2;
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    grid-column-gap: ${GEL_SPACING_DBL};
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(
      ${({ itemCount, trustProjectLink }) =>
        getRowCount(itemCount, 3, trustProjectLink)},
      auto
    );
    column-count: 3;
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    grid-column-gap: ${GEL_SPACING_DBL};
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(
      ${({ itemCount, trustProjectLink }) =>
        getRowCount(itemCount, 4, trustProjectLink)},
      auto
    );
    column-count: 4;
  }

  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-column-gap: ${GEL_SPACING_DBL};
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(
      ${({ itemCount, trustProjectLink }) =>
        getRowCount(itemCount, 5, trustProjectLink)},
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

const List = ({ elements, trustProjectLink }) => {
  const listItems = elements.map((elem, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <StyledListItem key={index} role="listitem">
      {elem}
    </StyledListItem>
  ));

  return (
    <StyledList
      role="list"
      trustProjectLink={trustProjectLink}
      itemCount={listItems.length}
    >
      {trustProjectLink && (
        <StyledListItem>
          <Link text={trustProjectLink.text} href={trustProjectLink.href} />
        </StyledListItem>
      )}
      {listItems}
    </StyledList>
  );
};

const linkPropTypes = shape({
  href: string.isRequired,
  text: string.isRequired,
  lang: string,
});

List.propTypes = {
  elements: arrayOf(element).isRequired,
  trustProjectLink: linkPropTypes,
};

List.defaultProps = { trustProjectLink: null };

export default List;
