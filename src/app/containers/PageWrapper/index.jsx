import React, { Fragment } from 'react';
import { bool, node, string } from 'prop-types';
import Helmet from 'react-helmet';
import HeaderContainer from '../Header';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import GlobalStyle from '../../lib/globalStyles';
import ConsentBanner from '../ConsentBanner';

const PageWrapper = ({ bbcOrigin, children, isAmp, service }) => (
  <Fragment>
    <GlobalStyle />
    <RequestContextProvider
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
      </ServiceContextProvider>
    </RequestContextProvider>
  </Fragment>
);

PageWrapper.propTypes = {
  bbcOrigin: string,
  children: node.isRequired,
  isAmp: bool,
  service: string,
};

PageWrapper.defaultProps = {
  bbcOrigin: 'https://www.bbc.co.uk',
  isAmp: false,
  service: 'news',
};

export default PageWrapper;
