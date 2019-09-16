import React from 'react';
import { node } from 'prop-types';
import GlobalStyle from '@bbc/psammead-styles/global-styles';
import HeaderContainer from '../containers/Header';
import FooterContainer from '../containers/Footer';
import ManifestContainer from '../containers/Manifest';
import ServiceWorkerContainer from '../containers/ServiceWorker';
import MPulseBeacon from '../containers/MPulseBeacon';

const PageWrapper = ({ children }) => (
  <>
    <GlobalStyle />
    <ServiceWorkerContainer />
    <ManifestContainer />
    <MPulseBeacon />
    <HeaderContainer />
    {children}
    <FooterContainer />
  </>
);

PageWrapper.propTypes = {
  children: node.isRequired,
};

export default PageWrapper;
