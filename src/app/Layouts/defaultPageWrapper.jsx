import React, { Fragment, useContext } from 'react';
import { node, string, bool } from 'prop-types';
import HeaderContainer from '../containers/Header';
import FooterContainer from '../containers/Footer';
import ManifestContainer from '../containers/Manifest';
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
import deepGet from '../lib/utilities/deepGet';

const PageWithRequestContext = ({
  children,
  env,
  id,
  isAmp,
  isUK,
  origin,
  pageType,
  service,
}) => {
  const lang = useContext(ServiceContext);
  const articleLang =
    pageType === 'article'
      ? deepGet(
          ['props', 'data', 'pageData', 'metadata', 'passport', 'language'],
          children,
        )
      : false;

  return (
    <RequestContextProvider
      env={env}
      id={id}
      isUK={isUK}
      lang={articleLang || lang}
      origin={origin}
      pageType={pageType}
      platform={isAmp ? 'amp' : 'canonical'}
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

const PageWrapper = ({ bbcOrigin, children, id, service, isAmp, pageType }) => {
  const { isUK, origin } = getOriginContext(bbcOrigin);
  const env = getEnv(origin);

  return (
    <Fragment>
      <ServiceContextProvider service={service}>
        <GlobalStyle />
        {PageWithRequestContext({
          children,
          env,
          id,
          isAmp,
          isUK,
          origin,
          pageType,
          service,
        })}
      </ServiceContextProvider>
    </Fragment>
  );
};

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
