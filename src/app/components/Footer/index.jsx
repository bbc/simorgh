import React from 'react';
import styled from 'styled-components';
import {
  C_GREY,
  C_WHITE,
  FF_NEWS_SANS_REG,
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '../../lib/constants/styles';

const StyledFooter = styled.footer`
  background-color: ${C_GREY};
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
  }
`;

const StyledListItem = styled.li`
  min-width: 50%;
  padding: ${GEL_SPACING}px;
`;

const StyledLink = styled.a`
  color: ${C_WHITE};
  text-decoration: none;

  &:hover,
  &focus {
    text-decoration: underline;
  }
`;

const StyledParagraph = styled.p`
  color: ${C_WHITE};
  padding-top: ${GEL_SPACING}px;
  margin: 0;
`;

const listItems = [
  {
    href: 'https://www.bbc.com/news/help-41670342',
    text: 'Why you can trust the BBC',
  },
  {
    href: 'http://www.bbc.com/terms',
    text: 'Terms of Use',
  },
  {
    href: 'https://www.bbc.com/news/help-41670342',
    text: 'About the BBC',
  },
  {
    href: 'https://www.bbc.com/news/help-41670342',
    text: 'Privacy Policy',
  },
  {
    href: 'http://www.bbc.com/terms',
    text: 'Cookies',
  },
  {
    href: 'https://www.bbc.com/news/help-41670342',
    text: 'Accessibility Help',
  },
  {
    href: 'https://www.bbc.com/news/help-41670342',
    text: 'Contact the BBC',
  },
];

const externalLink = {
  href: 'http://www.bbc.co.uk/help/web/links/',
  text: 'Read about our approach to external linking',
};

const Footer = () => (
  <StyledFooter role="contentinfo">
    <StyledList>
      {listItems.map(listItem => (
        <StyledListItem>
          <StyledLink href={listItem.href}>{listItem.text}</StyledLink>
        </StyledListItem>
      ))}
    </StyledList>
    <StyledParagraph>
      Copyright &copy; {new Date().getFullYear()} BBC. The BBC is not
      responsible for the content of external sites.
      <StyledLink href={externalLink.href}> {externalLink.text}</StyledLink>
    </StyledParagraph>
  </StyledFooter>
);

export default Footer;
