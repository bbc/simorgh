import React, { useContext } from 'react';
import { node } from 'prop-types';
import GlobalStyles from '@bbc/psammead-styles/global-styles';
import HeaderContainer from '../containers/Header';
import FooterContainer from '../containers/Footer';
import ManifestContainer from '../containers/Manifest';
import ServiceWorkerContainer from '../containers/ServiceWorker';
import { ServiceContext } from '../contexts/ServiceContext';
import { UserContext } from '../contexts/UserContext';
import useWebVitals from '#hooks/useWebVitals';
import useToggle from '#hooks/useToggle';

const PageWrapper = ({ children }) => {
  const { enabled: webVitalsEnabled } = useToggle('webVitals');
  const { personalisationEnabled } = useContext(UserContext);

  if (webVitalsEnabled && personalisationEnabled) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useWebVitals();
  }

  const { fonts: fontFunctions } = useContext(ServiceContext);

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
