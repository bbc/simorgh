import styled from 'styled-components';
import React from 'react';
import SitewideLinks from '@bbc/psammead-sitewide-links';
import BrandContainer from '../Brand';

// 3.5rem = 56px = 7 GEL_SPACING's
const Footer = styled.footer`
  margin-top: 3.5rem;
`;

const externalLink = {
  href: 'https://www.bbc.co.uk/help/web/links/',
  text: 'Read about our approach to external linking.',
};

const links = [
  {
    href: 'https://www.bbc.com/news/help-41670342',
    text: 'Why you can trust the BBC',
  },
  {
    href: 'https://www.bbc.com/terms',
    text: 'Terms of Use',
  },
  {
    href: 'https://www.bbc.co.uk/aboutthebbc/',
    text: 'About the BBC',
  },
  {
    href: 'https://www.bbc.com/privacy/',
    text: 'Privacy Policy',
  },
  {
    href: 'https://www.bbc.com/usingthebbc/cookies/',
    text: 'Cookies',
  },
  {
    href: 'https://www.bbc.com/accessibility/',
    text: 'Accessibility Help',
  },
  {
    href: 'https://www.bbc.com/contact/',
    text: 'Contact the BBC',
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
