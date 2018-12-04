import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string } from 'prop-types';
import { C_ORBIT_GREY, C_WHITE } from '@bbc/psammead-styles/colours';
import { FF_NEWS_SANS_REG } from '@bbc/psammead-styles/fonts';
import { T_BREVIER } from '../../lib/constants/typography';
import BrandContainer from '../../containers/Brand';

import Link from './Link';
import FooterList from './List';
import { GEL_SPACING_DBL } from '../../lib/constants/styles';
import { layoutWrapperWithoutGrid } from '../../lib/layoutGrid';

const StyledFooterLinksWrapper = styled.div`
  ${layoutWrapperWithoutGrid};
  background-color: ${C_ORBIT_GREY};
`;

const StyledFooterLinks = styled.div`
  ${T_BREVIER};
  font-family: ${FF_NEWS_SANS_REG};
`;

const StyledParagraph = styled.p`
  color: ${C_WHITE};
  margin: 0;
  padding: ${GEL_SPACING_DBL} 0;
`;

const Footer = ({ links, copyrightText, externalLink }) => (
  <footer role="contentinfo">
    {/*
     Components should not import containers, but this preliminary step
     is needed until https://github.com/BBC-News/simorgh/issues/1034 is resolved
    */}
    <BrandContainer />
    <StyledFooterLinksWrapper>
      <StyledFooterLinks>
        <FooterList links={links} />
        <StyledParagraph>
          {copyrightText}
          <Link text={externalLink.text} href={externalLink.href} inline />
        </StyledParagraph>
      </StyledFooterLinks>
    </StyledFooterLinksWrapper>
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
