import React from 'react';
import styled from 'styled-components';
import { string, arrayOf, shape } from 'prop-types';
import {
  C_WHITE,
  GEL_SPACING,
  group2ScreenWidthMax,
  group3ScreenWidthMin,
  group3ScreenWidthMax,
  group4ScreenWidthMin,
  group4ScreenWidthMax,
  group5ScreenWidthMin,
} from '../../lib/constants/styles';
import Link from '../Link';

const StyledList = styled.ul`
  border-bottom: 1px solid ${C_WHITE};
  display: grid;
  grid-auto-flow: column;
  @media (max-width: ${group2ScreenWidthMax}) {
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: repeat(4, 50%);
  }
  @media (min-width: ${group3ScreenWidthMin}) and (max-width: ${group3ScreenWidthMax}) {
    grid-template-columns: repeat(3, 33.333%);
    grid-template-rows: repeat(3, 33.333%);
  }
  @media (min-width: ${group4ScreenWidthMin}) and (max-width: ${group4ScreenWidthMax}) {
    grid-template-columns: repeat(4, 25%);
    grid-template-rows: repeat(3, 33.333%);
  }
  @media (min-width: ${group5ScreenWidthMin}) {
    grid-template-columns: repeat(5, 20%);
    grid-template-rows: repeat(3, 33.333%);
  }

  list-style-type: none;
  margin: 0;
  padding: ${GEL_SPACING};
  > li:first-child {
    border-bottom: 1px solid ${C_WHITE};
    grid-column: 1/-1;
    padding-bottom: ${GEL_SPACING};
    margin-bottom: ${GEL_SPACING};
    @supports not (display: grid) {
      width: 100%;
    }
  }
`;

const StyledListItem = styled.li`
  min-width: 50%;
  @supports not (display: grid) {
    display: inline-block;
  }
`;

const FooterList = ({ links }) => (
  <StyledList role="list">
    {links.map((link, index) => (
      // It is redundant to add ids when list items are static, have no ids by default and are never reordered or filtered
      // eslint-disable-next-line react/no-array-index-key
      <StyledListItem key={index} role="listitem">
        <Link text={link.text} href={link.href} />
      </StyledListItem>
    ))}
  </StyledList>
);

const linkPropTypes = shape({
  href: string.isRequired,
  text: string.isRequired,
});

FooterList.propTypes = {
  links: arrayOf(linkPropTypes.isRequired).isRequired,
};

export default FooterList;
