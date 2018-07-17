import React from 'react';
import styled from 'styled-components';
import { arrayOf, string } from 'prop-types';
import {
  C_ORBIT_GREY,
  C_WHITE,
  FF_NEWS_SANS_REG,
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '../../lib/constants/styles';
import { linkPropTypes } from '../../models/proptypes';

const StyledFooter = styled.footer`
  background-color: ${C_ORBIT_GREY};
  font-family: ${FF_NEWS_SANS_REG};
  padding: ${GEL_SPACING_DBL}px ${GEL_SPACING}px;
`;

const StyledList = styled.ul`
  border-bottom: 1px solid ${C_WHITE};
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(4, 50%);
  list-style-type: none;
  margin: 0 0 ${GEL_SPACING}px 0;
  padding: 0 0 ${GEL_SPACING}px 0;
  > li:first-child {
    border-bottom: 1px solid ${C_WHITE};
    grid-column: 1/3;
    margin-bottom: ${GEL_SPACING}px;
    @supports not (display: grid) {
      width: 100%;
    }
  }
`;

const StyledListItem = styled.li`
  min-width: 50%;
  padding: ${GEL_SPACING}px;
  @supports not (display: grid) {
    padding: ${GEL_SPACING}px 0;
    display: inline-block;
  }
`;

const StyledLink = styled.a`
  color: ${C_WHITE};
  font-weight: 700; /* Used instead of Reith Sans Bold since it is not worth the performance cost in this case. */
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const StyledParagraph = styled.p`
  color: ${C_WHITE};
  padding: ${GEL_SPACING}px 0 0 0;
  margin: 0;
`;

const Footer = ({ list, text, link }) => (
  <StyledFooter role="contentinfo">
    <StyledList>
      {list.map((listItem, index) => (
        // It is redundant to add ids when list items are static, have no ids by default and are never reordered or filtered
        // eslint-disable-next-line react/no-array-index-key
        <StyledListItem key={index}>
          <StyledLink href={listItem.href}>{listItem.text}</StyledLink>
        </StyledListItem>
      ))}
    </StyledList>
    <StyledParagraph>
      {text}
      <StyledLink href={link.href}>{link.text}</StyledLink>
    </StyledParagraph>
  </StyledFooter>
);

Footer.propTypes = {
  list: arrayOf(linkPropTypes.isRequired).isRequired,
  text: string.isRequired,
  link: linkPropTypes.isRequired,
};

export default Footer;
