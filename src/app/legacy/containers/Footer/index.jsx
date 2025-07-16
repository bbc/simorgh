import React, { use } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import Footer from '#app/components/Footer';
import { ServiceContext } from '../../../contexts/ServiceContext';
import BrandContainer from '../Brand';

const FooterContainer = () => {
  const { isApp } = use(RequestContext);
  const { footer, serviceLang } = use(ServiceContext);

  if (isApp || !footer) return null;

  // linkId="footer" is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652

  return (
    <footer 
      role="contentinfo" 
      lang={serviceLang}
      className="[content-visibility:auto] [contain-intrinsic-size:33.125rem] group-1:[contain-intrinsic-size:26.563rem] group-b:[contain-intrinsic-size:23.438rem] group-2:[contain-intrinsic-size:21.875rem] group-3:[contain-intrinsic-size:17.188rem]"
    >
      <BrandContainer linkId="footer" borderTop />
      <Footer />
    </footer>
  );
};

export default FooterContainer;
