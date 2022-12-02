import React, { useContext } from 'react';
import { node, shape, bool, number } from 'prop-types';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import GlobalStyles from '#psammead/psammead-styles/src/global-styles';
import styled from '@emotion/styled';
import {
  C_GHOST,
  C_MIDNIGHT_BLACK,
} from '#psammead/psammead-styles/src/colours';
import WebVitals from '#containers/WebVitals';
import HeaderContainer from '#containers/Header';
import FooterContainer from '#containers/Footer';
import ManifestContainer from '#containers/Manifest';
import ServiceWorkerContainer from '#containers/ServiceWorker';
import { ServiceContext } from '../contexts/ServiceContext';
import ThemeProvider from '../components/ThemeProvider';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ darkMode }) =>
    darkMode ? C_MIDNIGHT_BLACK : C_GHOST};
`;

const Content = styled.div`
  flex-grow: 1;
`;

const PageWrapper = ({ children, pageData, status }) => {
  const { service, variant } = useContext(ServiceContext);
  const isDarkMode = pathOr(false, ['darkMode'], pageData);
  const scriptSwitchId = pathOr('', ['scriptSwitchId'], pageData);
  const renderScriptSwitch = pathOr(true, ['renderScriptSwitch'], pageData);
  const isErrorPage = [404, 500].includes(status);
  const pageType = isErrorPage
    ? 'WS-ERROR-PAGE'
    : path(['metadata', 'type'], pageData);

  return (
    <ThemeProvider service={service} variant={variant}>
      <GlobalStyles />
      <ServiceWorkerContainer />
      <ManifestContainer />
      <WebVitals pageType={pageType} />
      <Wrapper id="main-wrapper" darkMode={isDarkMode}>
        <HeaderContainer
          scriptSwitchId={scriptSwitchId}
          renderScriptSwitch={renderScriptSwitch}
        />
        <Content>{children}</Content>
        <FooterContainer />
      </Wrapper>
    </ThemeProvider>
  );
};

PageWrapper.propTypes = {
  children: node.isRequired,
  pageData: shape({ darkMode: bool }),
  status: number.isRequired,
};

PageWrapper.defaultProps = {
  pageData: {},
};

export default PageWrapper;
