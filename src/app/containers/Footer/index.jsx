import React, { useContext } from 'react';
import SitewideLinks from '@bbc/psammead-sitewide-links';
import { ServiceContext } from '#contexts/ServiceContext';
import BrandContainer from '../Brand';

const currentYear = () => new Date().getFullYear();
const getCopyrightText = text => (
  <>
    <span lang="en-GB">{`\u00A9`} </span>
    {`${currentYear()} ${text}`}
  </>
);

const FooterContainer = () => {
  const { footer, service, officialLang } = useContext(ServiceContext);

  if (!footer) {
    return null;
  }

  // 'officialLang' value is only available in the ukrainian config as our ukraine_in_russian pages will have
  // ukrainian text for the header and footer but russian text for the main element
  const footerLangAttribute = officialLang && { lang: officialLang };

  const { externalLink, links, copyrightText, trustProjectLink } = footer;

  return (
    <footer role="contentinfo" {...footerLangAttribute}>
      <BrandContainer borderTop />
      <SitewideLinks
        links={links}
        copyrightText={getCopyrightText(copyrightText)}
        externalLink={externalLink}
        service={service}
        trustProjectLink={trustProjectLink}
      />
    </footer>
  );
};

export default FooterContainer;
