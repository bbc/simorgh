import styled from 'styled-components';
import React from 'react';
import SitewideLinks from '@bbc/psammead-sitewide-links';
import { GEL_SPACING_QUAD } from '@bbc/gel-foundations/spacings';
import BrandContainer from '../Brand';

const Footer = styled.footer`
  padding-top: ${GEL_SPACING_QUAD};
`;

const externalLink = {
  href: 'https://www.bbc.co.uk/help/web/links/',
  text: 'Read about our approach to external linking.',
};

const links = [
  {
    href: 'https://www.bbc.com/news/help-41670342',
    text: 'Why you can trust the BBC',
    id: 'trust',
  },
  {
    href: 'https://www.bbc.com/terms',
    text: 'Terms of Use',
    id: 'terms',
  },
  {
    href: 'https://www.bbc.co.uk/aboutthebbc/',
    text: 'About the BBC',
    id: 'about',
  },
  {
    href: 'https://www.bbc.com/privacy/',
    text: 'Privacy Policy',
    id: 'privacy',
  },
  {
    href: 'https://www.bbc.com/usingthebbc/cookies/',
    text: 'Cookies',
    id: 'cookies',
  },
  {
    href: 'https://www.bbc.com/accessibility/',
    text: 'Accessibility Help',
    id: 'a11y',
  },
  {
    href: 'https://www.bbc.com/contact/',
    text: 'Contact the BBC',
    id: 'contact',
  },
];

const currentYear = () => new Date().getFullYear();
const copyrightText = () =>
  `\u00A9 ${currentYear()} BBC. The BBC is not responsible for the content of external sites. `;

const FooterContainer = () => (
  <Footer role="contentinfo">
    <BrandContainer />
    <SitewideLinks
      links={links}
      copyrightText={copyrightText()}
      externalLink={externalLink}
    />
  </Footer>
);

export default FooterContainer;
