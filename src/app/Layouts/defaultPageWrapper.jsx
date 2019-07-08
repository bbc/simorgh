import React, { useContext } from 'react';
import { node, string, bool, shape, any, objectOf } from 'prop-types';
import HeaderContainer from '../containers/Header';
import FooterContainer from '../containers/Footer';
import ManifestContainer from '../containers/Manifest';
import ServiceWorkerContainer from '../containers/ServiceWorker';
import {
  ServiceContextProvider,
  ServiceContext,
} from '../contexts/ServiceContext';
import { DialContextProvider } from '../contexts/DialContext';
import { RequestContextProvider } from '../contexts/RequestContext';
import ConsentBanner from '../containers/ConsentBanner';
import GlobalStyle from '../lib/globalStyles';

const PageWithRequestContext = ({
  bbcOrigin,
  children,
  data,
  id,
  isAmp,
  pageType,
  service,
}) => {
  const { lang } = useContext(ServiceContext);

  return (
    <RequestContextProvider
      bbcOrigin={bbcOrigin}
      data={data}
      id={id}
      isAmp={isAmp}
      pageType={pageType}
      service={service}
      serviceLang={lang}
    >
      <ServiceWorkerContainer />
      <ManifestContainer />
      <ConsentBanner />
      <HeaderContainer />
      {children}
      <FooterContainer />
    </RequestContextProvider>
  );
};

PageWithRequestContext.propTypes = {
  children: node.isRequired,
  data: shape({ any }).isRequired,
  id: string,
  isAmp: bool.isRequired,
  bbcOrigin: string,
  pageType: string.isRequired,
  service: string.isRequired,
};

PageWithRequestContext.defaultProps = {
  id: null,
  bbcOrigin: '',
};

const PageWrapper = ({
  bbcOrigin,
  children,
  data,
  id,
  service,
  isAmp,
  pageType,
  dials,
}) => (
  <DialContextProvider dials={dials}>
    <ServiceContextProvider service={service}>
      <GlobalStyle />
      <PageWithRequestContext
        data={data}
        id={id}
        isAmp={isAmp}
        bbcOrigin={bbcOrigin}
        pageType={pageType}
        service={service}
      >
        {children}
      </PageWithRequestContext>
    </ServiceContextProvider>
  </DialContextProvider>
);

PageWrapper.propTypes = {
  bbcOrigin: string,
  children: node.isRequired,
  data: shape({ any }).isRequired,
  id: string,
  isAmp: bool.isRequired,
  pageType: string.isRequired,
  service: string.isRequired,
  dials: objectOf(bool).isRequired,
};

PageWrapper.defaultProps = {
  bbcOrigin: null,
  id: null,
};

PageWrapper.defaultProps = {};

export default PageWrapper;
