import React from 'react';
import styled from 'styled-components';
import {
  C_ORBIT_GREY,
  C_WHITE,
  FF_NEWS_SANS_REG,
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '../../lib/constants/styles';

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

const listItems = [
  {
    href: 'https://www.bbc.com/news/help-41670342',
    id: '1',
    text: 'Why you can trust the BBC',
  },
  {
    href: 'https://www.bbc.com/terms',
    id: '2',
    text: 'Terms of Use',
  },
  {
    href: 'https://www.bbc.com/news/help-41670342',
    id: '3',
    text: 'About the BBC',
  },
  {
    href: 'https://www.bbc.com/news/help-41670342',
    id: '4',
    text: 'Privacy Policy',
  },
  {
    href: 'https://www.bbc.com/terms',
    id: '5',
    text: 'Cookies',
  },
  {
    href: 'https://www.bbc.com/news/help-41670342',
    id: '6',
    text: 'Accessibility Help',
  },
  {
    href: 'https://www.bbc.com/news/help-41670342',
    id: '7',
    text: 'Contact the BBC',
  },
];

const externalLink = {
  href: 'https://www.bbc.co.uk/help/web/links/',
  text: 'Read about our approach to external linking.',
};

const Footer = () => (
  <StyledFooter role="contentinfo">
    <StyledList>
      {listItems.map(listItem => (
        <StyledListItem key={listItem.id}>
          <StyledLink href={listItem.href}>{listItem.text}</StyledLink>
        </StyledListItem>
      ))}
    </StyledList>
    <StyledParagraph>
      Copyright &copy; {new Date().getFullYear()} BBC. The BBC is not
      responsible for the content of external sites.
      <StyledLink href={externalLink.href}>{externalLink.text}</StyledLink>
    </StyledParagraph>
  </StyledFooter>
);

export default Footer;
