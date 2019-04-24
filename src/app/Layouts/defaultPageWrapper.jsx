import React, { Fragment } from 'react';
import { node, string, shape } from 'prop-types';
import Helmet from 'react-helmet';
import HeaderContainer from '../containers/Header';
import FooterContainer from '../containers/Footer';
import { ServiceContextProvider } from '../contexts/ServiceContext';
import { RequestContextProvider } from '../contexts/RequestContext';
import GlobalStyle from '../lib/globalStyles';
import ConsentBanner from '../containers/ConsentBanner';

const PageWrapper = ({ bbcOrigin, children, data }) => {
  const { isAmp, service } = data;
  return (
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
          <FooterContainer />
        </ServiceContextProvider>
      </RequestContextProvider>
    </Fragment>
  );
};

PageWrapper.propTypes = {
  bbcOrigin: string.isRequired,
  children: node.isRequired,
  data: shape.isRequired,
};

PageWrapper.defaultProps = {};

export default PageWrapper;
