import React, { Fragment } from 'react';
import { node, string, bool } from 'prop-types';
import Helmet from 'react-helmet';
import HeaderContainer from '../containers/Header';
import FooterContainer from '../containers/Footer';
import { ServiceContextProvider } from '../contexts/ServiceContext';
import { RequestContextProvider } from '../contexts/RequestContext';
import GlobalStyle from '../lib/globalStyles';
import ConsentBanner from '../containers/ConsentBanner';

const PageWrapper = ({
  bbcOrigin,
  children,
  id,
  service,
  statsDestination,
  statsPageIdentifier,
  isAmp,
}) => (
  <Fragment>
    <GlobalStyle />
    <RequestContextProvider
      id={id}
      statsDestination={statsDestination}
      statsPageIdentifier={statsPageIdentifier}
      platform={isAmp ? 'amp' : 'canonical'}
      bbcOrigin={bbcOrigin}
    >
      <ServiceContextProvider service={service}>
        <Helmet>
          <link rel="manifest" href={`/${service}/articles/manifest.json`} />
        </Helmet>
        <ConsentBanner />
        <HeaderContainer />
        {children}
        <FooterContainer />
      </ServiceContextProvider>
    </RequestContextProvider>
  </Fragment>
);

PageWrapper.propTypes = {
  bbcOrigin: string,
  children: node.isRequired,
  id: string.isRequired,
  isAmp: bool.isRequired,
  service: string.isRequired,
  statsDestination: string.isRequired,
  statsPageIdentifier: string.isRequired,
};

PageWrapper.defaultProps = {
  bbcOrigin: null,
};

PageWrapper.defaultProps = {};

export default PageWrapper;
