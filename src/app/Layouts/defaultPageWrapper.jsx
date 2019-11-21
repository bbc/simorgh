import React, { useContext, useEffect } from 'react';
import { node } from 'prop-types';
import GlobalStyles from '@bbc/psammead-styles/global-styles';
import HeaderContainer from '../containers/Header';
import FooterContainer from '../containers/Footer';
import ManifestContainer from '../containers/Manifest';
import ServiceWorkerContainer from '../containers/ServiceWorker';
import MPulseBeacon from '../containers/MPulseBeacon';
import { ServiceContext } from '../contexts/ServiceContext';

const PageWrapper = ({ children }) => {
  const { fonts: fontFunctions } = useContext(ServiceContext);

  const fonts = fontFunctions.map(getFonts => getFonts());

  useEffect(() => {
    console.log('Page Wrapper mounted');
    return () => {
      console.log('Page Wrapper unmounted');
    };
  }, []);

  return (
    <>
      <GlobalStyles fonts={fonts} />
      <ServiceWorkerContainer />
      <ManifestContainer />
      <MPulseBeacon />
      <HeaderContainer />
      {children}
      <FooterContainer />
    </>
  );
};

PageWrapper.propTypes = {
  children: node.isRequired,
};

export default PageWrapper;
