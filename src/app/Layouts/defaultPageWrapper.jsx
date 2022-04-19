import React, { useContext } from 'react';
import { node, shape, bool, number } from 'prop-types';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import GlobalStyles from '@bbc/psammead-styles/global-styles';
import styled from '@emotion/styled';
import { C_GHOST, C_MIDNIGHT_BLACK } from '@bbc/psammead-styles/colours';
import WebVitals from '#app/containers/WebVitals';
import HeaderContainer from '../containers/Header';
import FooterContainer from '../containers/Footer';
import ManifestContainer from '../containers/Manifest';
import ServiceWorkerContainer from '../containers/ServiceWorker';
import { ServiceContext } from '../contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';

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
  const { fonts: fontFunctions } = useContext(ServiceContext);
  const { isLow, isLite } = useContext(RequestContext);
  const fonts = (isLow || isLite) ? [] : fontFunctions.map(getFonts => getFonts());

  const isDarkMode = pathOr(false, ['darkMode'], pageData);
  const isErrorPage = [404, 500].includes(status);
  const pageType = isErrorPage
    ? 'WS-ERROR-PAGE'
    : path(['metadata', 'type'], pageData);

  return (
    <>
      <GlobalStyles fonts={fonts} />
      <ServiceWorkerContainer />
      <ManifestContainer />
      <WebVitals pageType={pageType} />
      <Wrapper id="main-wrapper" darkMode={isDarkMode}>
        <HeaderContainer />
        <Content>{children}</Content>
        <FooterContainer />
      </Wrapper>
    </>
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
