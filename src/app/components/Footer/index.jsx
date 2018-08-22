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

const StyledParagraph = styled.p`
  color: ${C_WHITE};
  padding: ${GEL_SPACING_DBL};
  margin: 0;
`;

const Footer = ({ links, copyrightText, externalLink }) => (
  <footer role="contentinfo">
    <Brand indentedLogo={false} />
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
