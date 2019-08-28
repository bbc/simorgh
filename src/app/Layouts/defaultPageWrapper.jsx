import React from 'react';
import { node } from 'prop-types';
import GlobalStyle from '@lib/globalStyles';
import HeaderContainer from '../containers/Header';
import FooterContainer from '../containers/Footer';
import ManifestContainer from '../containers/Manifest';
import ServiceWorkerContainer from '../containers/ServiceWorker';

const PageWrapper = ({ children }) => (
  <>
    <GlobalStyle />
    <ServiceWorkerContainer />
    <ManifestContainer />
    <HeaderContainer />
    {children}
    <FooterContainer />
  </>
);

PageWrapper.propTypes = {
  children: node.isRequired,
};

export default PageWrapper;
