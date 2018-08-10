import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string } from 'prop-types';
import Link from '../Link';
import FooterList from '../FooterList';
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
  padding: 0 ${GEL_SPACING}px;
`;

const StyledParagraph = styled.p`
  color: ${C_WHITE};
  padding: ${GEL_SPACING_DBL}px 0;
  margin: 0;
`;

const Footer = ({ links, copyrightText, externalLink }) => (
  <StyledFooter role="contentinfo">
    <FooterList links={links} />
    <StyledParagraph>
      {copyrightText}
      <Link text={externalLink.text} href={externalLink.href} inline />
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
