import React, { useContext } from 'react';
import { node } from 'prop-types';
import GlobalStyles from '@bbc/psammead-styles/global-styles';
import HeaderContainer from '../containers/Header';
import FooterContainer from '../containers/Footer';
import ManifestContainer from '../containers/Manifest';
import ServiceWorkerContainer from '../containers/ServiceWorker';
import { ServiceContext } from '../contexts/ServiceContext';
import useWebVitals from '@bbc/web-vitals';

const PageWrapper = ({ children }) => {
  const { fonts: fontFunctions } = useContext(ServiceContext);

  const webVitalsConfig = {
    enabled: true,
    reportingEndpoint: process.env.SIMORGH_WEBVITALS_REPORTING_ENDPOINT,
    sampleRate: process.env.SIMORGH_WEBVITALS_SAMPLING_RATE,
    loggerCallback: () => console.error,
  };

  useWebVitals(webVitalsConfig);

  const fonts = fontFunctions.map(getFonts => getFonts());

  return (
    <>
      <GlobalStyles fonts={fonts} />
      <ServiceWorkerContainer />
      <ManifestContainer />
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
