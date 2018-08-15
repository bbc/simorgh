import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string } from 'prop-types';
import Brand from '../Brand';
import Link from '../Link';
import FooterList from '../FooterList';
import {
  C_ORBIT_GREY,
  C_WHITE,
  FF_NEWS_SANS_REG,
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '../../lib/constants/styles';

const StyledFooterLinks = styled.div`
  background-color: ${C_ORBIT_GREY};
  font-family: ${FF_NEWS_SANS_REG};
  padding: 0 ${GEL_SPACING};
`;

const StyledList = styled.ul`
  border-bottom: 1px solid ${C_WHITE};
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(4, 50%);
  list-style-type: none;
  margin: 0;
  padding: ${GEL_SPACING} 0;
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

const StyledLink = styled.a`
  color: ${C_WHITE};
  font-weight: 700; /* Used instead of Reith Sans Bold since it is not worth the performance cost in this case. */
  text-decoration: none;
  padding: ${GEL_SPACING} 0;
  display: block;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const InlineBlockLink = styled(StyledLink)`
  display: inline;
  padding: ${GEL_SPACING} 0;
`;

const StyledParagraph = styled.p`
  color: ${C_WHITE};
  padding: ${GEL_SPACING_DBL} 0;
  margin: 0;
`;

const Footer = ({ links, copyrightText, externalLink }) => (
  <footer role="contentinfo">
    <Brand />
    <StyledFooterLinks>
      <FooterList links={links} />
      <StyledParagraph>
        {copyrightText}
        <Link text={externalLink.text} href={externalLink.href} inline />
      </StyledParagraph>
    </StyledFooterLinks>
  </footer>
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
