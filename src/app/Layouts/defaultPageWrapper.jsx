import React, { useContext } from 'react';
import { node, shape, bool } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import GlobalStyles from '@bbc/psammead-styles/global-styles';
import styled from '@emotion/styled';
import { C_GHOST, C_MIDNIGHT_BLACK } from '@bbc/psammead-styles/colours';
import HeaderContainer from '../containers/Header';
import FooterContainer from '../containers/Footer';
import ManifestContainer from '../containers/Manifest';
import ServiceWorkerContainer from '../containers/ServiceWorker';
import { ServiceContext } from '../contexts/ServiceContext';
import WebVitals from '#app/containers/WebVitals';

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

const PageWrapper = ({ children, pageData }) => {
  const { fonts: fontFunctions } = useContext(ServiceContext);
  const fonts = fontFunctions.map(getFonts => getFonts());

  const isDarkMode = pathOr(false, ['darkMode'], pageData);

  return (
    <>
      <GlobalStyles fonts={fonts} />
      <ServiceWorkerContainer />
      <ManifestContainer />
      <WebVitals />
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
};

PageWrapper.defaultProps = {
  pageData: {},
};

export default PageWrapper;
