import React, { useContext } from 'react';
import SitewideLinks from '@bbc/psammead-sitewide-links';
import { ServiceContext } from '../../contexts/ServiceContext';
import BrandContainer from '../Brand';

const currentYear = () => new Date().getFullYear();
const getCopyrightText = text => `\u00A9 ${currentYear()} ${text} `;

const FooterContainer = () => {
  const { footer, service } = useContext(ServiceContext);

  if (!footer) {
    return null;
  }

  const { externalLink, links, copyrightText } = footer;

  return (
    <footer role="contentinfo">
      <BrandContainer borderTop />
      <SitewideLinks
        links={links}
        copyrightText={getCopyrightText(copyrightText)}
        externalLink={externalLink}
        service={service}
      />
    </footer>
  );
};

export default FooterContainer;
