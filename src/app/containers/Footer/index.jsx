import React from 'react';
import Footer from '../../components/Footer';

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
    href: 'https://www.bbc.com/news/help-41670342',
    text: 'About the BBC',
  },
  {
    href: 'https://www.bbc.com/news/help-41670342',
    text: 'Privacy Policy',
  },
  {
    href: 'https://www.bbc.com/terms',
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

const currentYear = new Date().getFullYear();
const copyrightText = `Copyright \u00A9 ${currentYear} BBC. The BBC is not responsible for the content of external sites. `;

const FooterContainer = () => (
  <Footer
    links={links}
    copyrightText={copyrightText}
    externalLink={externalLink}
  />
);

export default FooterContainer;
