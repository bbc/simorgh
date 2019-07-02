import React, { Fragment } from 'react';
import { node, string, bool } from 'prop-types';
import HeaderContainer from '../containers/Header';
import FooterContainer from '../containers/Footer';
import ManifestContainer from '../containers/Manifest';
import ServiceWorkerContainer from '../containers/ServiceWorker';
import { ServiceContextProvider } from '../contexts/ServiceContext';
import { RequestContextProvider } from '../contexts/RequestContext';
import ConsentBanner from '../containers/ConsentBanner';
import GlobalStyle from '../lib/globalStyles';

const PageWrapper = ({ bbcOrigin, children, id, service, isAmp, pageType }) => (
  <Fragment>
    <ServiceContextProvider service={service}>
      <GlobalStyle />
      <RequestContextProvider
        bbcOrigin={bbcOrigin}
        id={id}
        isAmp={isAmp}
        pageType={pageType}
        service={service}
      >
        <ServiceWorkerContainer />
        <ManifestContainer />
        <ConsentBanner />
        <HeaderContainer />
        {children}
        <FooterContainer />
      </RequestContextProvider>
    </ServiceContextProvider>
  </Fragment>
);

PageWrapper.propTypes = {
  bbcOrigin: string,
  children: node.isRequired,
  id: string,
  isAmp: bool.isRequired,
  pageType: string.isRequired,
  service: string.isRequired,
};

PageWrapper.defaultProps = {
  bbcOrigin: null,
  id: null,
};

PageWrapper.defaultProps = {};

export default PageWrapper;
