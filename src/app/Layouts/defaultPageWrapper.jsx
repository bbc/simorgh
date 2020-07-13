import React, { useContext } from 'react';
import { node } from 'prop-types';
import GlobalStyles from '@bbc/psammead-styles/global-styles';
import AmpGeo from '@bbc/psammead-amp-geo';
import HeaderContainer from '../containers/Header';
import FooterContainer from '../containers/Footer';
import ManifestContainer from '../containers/Manifest';
import ServiceWorkerContainer from '../containers/ServiceWorker';
import { ServiceContext } from '../contexts/ServiceContext';
import { RequestContext } from '../contexts/RequestContext';

const PageWrapper = ({ children }) => {
  const { fonts: fontFunctions } = useContext(ServiceContext);
  const { isAmp } = useContext(RequestContext);

  const fonts = fontFunctions.map(getFonts => getFonts());

  return (
    <>
      <GlobalStyles fonts={fonts} />
      <ServiceWorkerContainer />
      <ManifestContainer />
      <HeaderContainer />
      {isAmp && <AmpGeo />}
      {children}
      <FooterContainer />
    </>
  );
};

PageWrapper.propTypes = {
  children: node.isRequired,
};

export default PageWrapper;
