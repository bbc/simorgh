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
  // `serviceLang` is defined when the language the page is written in is different to the
  // language of the service. `serviceLang` is used to override the page language.
  const { footer, service, serviceLang } = useContext(ServiceContext);

  if (!footer) {
    return null;
  }

  const { externalLink, links, copyrightText, trustProjectLink } = footer;

  return (
    <footer role="contentinfo" lang={serviceLang}>
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
