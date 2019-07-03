import React, { Fragment, useContext } from 'react';
import { node, string, bool } from 'prop-types';
import HeaderContainer from '../containers/Header';
import FooterContainer from '../containers/Footer';
import ManifestContainer from '../containers/Manifest';
import ServiceWorkerContainer from '../containers/ServiceWorker';
import {
  ServiceContextProvider,
  ServiceContext,
} from '../contexts/ServiceContext';
import { RequestContextProvider } from '../contexts/RequestContext';
import ConsentBanner from '../containers/ConsentBanner';
import getStatsDestination from '../contexts/RequestContext/getStatsDestination';
import getStatsPageIdentifier from '../contexts/RequestContext/getStatsPageIdentifier';
import getOriginContext from '../contexts/RequestContext/getOriginContext';
import getEnv from '../contexts/RequestContext/getEnv';
import GlobalStyle from '../lib/globalStyles';

const PageWithRequestContext = ({
  children,
  data,
  env,
  id,
  isAmp,
  isUK,
  origin,
  pageType,
  service,
}) => {
  const { lang } = useContext(ServiceContext);

  return (
    <RequestContextProvider
      data={data}
      env={env}
      id={id}
      isUK={isUK}
      origin={origin}
      pageType={pageType}
      platform={isAmp ? 'amp' : 'canonical'}
      serviceLang={lang}
      statsDestination={getStatsDestination({
        isUK,
        env,
        service,
      })}
      statsPageIdentifier={getStatsPageIdentifier({
        pageType,
        service,
        id,
      })}
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
  env: string.isRequired,
  data: node.isRequired,
  id: string,
  isAmp: bool.isRequired,
  isUK: bool.isRequired,
  origin: string.isRequired,
  pageType: string.isRequired,
  service: string.isRequired,
};

PageWithRequestContext.defaultProps = {
  id: null,
};

const PageWrapper = ({
  bbcOrigin,
  children,
  data,
  id,
  service,
  isAmp,
  pageType,
}) => {
  const { isUK, origin } = getOriginContext(bbcOrigin);
  const env = getEnv(origin);

  return (
    <Fragment>
      <ServiceContextProvider service={service}>
        <GlobalStyle />
        <PageWithRequestContext
          data={data}
          env={env}
          id={id}
          isAmp={isAmp}
          isUK={isUK}
          origin={origin}
          pageType={pageType}
          service={service}
        >
          {children}
        </PageWithRequestContext>
      </ServiceContextProvider>
    </Fragment>
  );
};

PageWrapper.propTypes = {
  bbcOrigin: string,
  children: node.isRequired,
  data: node.isRequired,
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
