import React from 'react';
import { node, string, bool, objectOf } from 'prop-types';
import HeaderContainer from '../containers/Header';
import FooterContainer from '../containers/Footer';
import ManifestContainer from '../containers/Manifest';
import ServiceWorkerContainer from '../containers/ServiceWorker';
import { DialContextProvider } from '../contexts/DialContext';
import { ServiceContextProvider } from '../contexts/ServiceContext';
import { RequestContextProvider } from '../contexts/RequestContext';
import ConsentBanner from '../containers/ConsentBanner';
import GlobalStyle from '../lib/globalStyles';

const PageWrapper = ({
  bbcOrigin,
  children,
  id,
  service,
  isAmp,
  pageType,
  dials,
  previousPath,
}) => (
  <DialContextProvider dials={dials}>
    <ServiceContextProvider service={service}>
      <GlobalStyle />
      <RequestContextProvider
        bbcOrigin={bbcOrigin}
        id={id}
        isAmp={isAmp}
        pageType={pageType}
        service={service}
        previousPath={previousPath}
      >
        <ServiceWorkerContainer />
        <ManifestContainer />
        <ConsentBanner />
        <HeaderContainer />
        {children}
        <FooterContainer />
      </RequestContextProvider>
    </ServiceContextProvider>
  </DialContextProvider>
);

PageWrapper.propTypes = {
  bbcOrigin: string,
  children: node.isRequired,
  id: string,
  isAmp: bool.isRequired,
  pageType: string.isRequired,
  service: string.isRequired,
  previousPath: string,
  dials: objectOf(bool).isRequired,
};

PageWrapper.defaultProps = {
  bbcOrigin: null,
  id: null,
  previousPath: null,
};

PageWrapper.defaultProps = {};

export default PageWrapper;
