import React, { Fragment } from 'react';
import { node } from 'prop-types';
import HeaderContainer from '../containers/Header';
import FooterContainer from '../containers/Footer';
import ManifestContainer from '../containers/Manifest';
import ServiceWorkerContainer from '../containers/ServiceWorker';
import GlobalStyle from '../lib/globalStyles';

const PageWrapper = ({ children }) => (
  <Fragment>
    <GlobalStyle />
    <ServiceWorkerContainer />
    <ManifestContainer />
    <HeaderContainer />
    {children}
    <FooterContainer />
  </Fragment>
);

PageWrapper.propTypes = {
  children: node.isRequired,
};

export default PageWrapper;
