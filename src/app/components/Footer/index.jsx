import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string } from 'prop-types';
import {
  C_ORBIT_GREY,
  C_WHITE,
  FF_NEWS_SANS_REG,
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '../../lib/constants/styles';

const StyledFooter = styled.footer`
  background-color: ${C_ORBIT_GREY};
  box-sizing: border-box;
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

const Footer = ({ links, copyrightText, externalLink }) => (
  <StyledFooter role="contentinfo">
    <StyledList>
      {links.map((link, index) => (
        // It is redundant to add ids when list items are static, have no ids by default and are never reordered or filtered
        // eslint-disable-next-line react/no-array-index-key
        <StyledListItem key={index}>
          <StyledLink href={link.href}>{link.text}</StyledLink>
        </StyledListItem>
      ))}
    </StyledList>
    <StyledParagraph>
      {copyrightText}
      <StyledLink href={externalLink.href}>{externalLink.text}</StyledLink>
    </StyledParagraph>
  </StyledFooter>
);

const linkPropTypes = shape({
  href: string.isRequired,
  text: string.isRequired,
});

Footer.propTypes = {
  links: arrayOf(linkPropTypes.isRequired).isRequired,
  copyrightText: string.isRequired,
  externalLink: linkPropTypes.isRequired,
};

export default Footer;
