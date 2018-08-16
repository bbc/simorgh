import React from 'react';
import styled from 'styled-components';
import { string, arrayOf, shape } from 'prop-types';
import { C_WHITE, GEL_SPACING } from '../../lib/constants/styles';
import Link from '../Link';

const StyledList = styled.ul`
  border-bottom: 1px solid ${C_WHITE};
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(4, 50%);
  list-style-type: none;
  margin: 0;
  padding: ${GEL_SPACING};
  > li:first-child {
    border-bottom: 1px solid ${C_WHITE};
    grid-column: 1/3;
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
