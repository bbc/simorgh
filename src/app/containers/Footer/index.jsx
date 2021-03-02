import React, { useContext } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import Footer from '#components/Footer';
import BrandContainer from '../Brand';

const currentYear = () => new Date().getFullYear();
const getCopyrightText = text => (
  <>
    <span lang="en-GB">{`\u00A9`} </span>
    {`${currentYear()} ${text}`}
  </>
);

const FooterContainer = () => {
  const { isAmp } = useContext(RequestContext);
  const { footer, script, service, serviceLang } = useContext(ServiceContext);

  if (!footer) return null;

  const { externalLink, links, copyrightText, trustProjectLink } = footer;

  return (
    <footer role="contentinfo" lang={serviceLang}>
      <BrandContainer borderTop />
      <Footer
        isAmp={isAmp}
        links={links}
        copyrightText={getCopyrightText(copyrightText)}
        externalLink={externalLink}
        script={script}
        service={service}
        trustProjectLink={trustProjectLink}
      />
    </footer>
  );
};

export default FooterContainer;
