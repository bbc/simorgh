import React, { useContext, useEffect } from 'react';
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

  useEffect(() => {
    const fontsForStorage = [
      {
        name: 'BBCReithSerif_W_Md',
        version: 'r2.512',
        subsets: false,
        fontFamily: 'ReithSerif',
        fontWeight: 500,
      },
      {
        name: 'BBCReithSans_W_Rg',
        version: 'r2.512',
        subsets: false,
        fontFamily: 'ReithSans',
        fontWeight: 400,
      },
      {
        name: 'BBCReithSans_W_Bd',
        version: 'r2.512',
        subsets: false,
        fontFamily: 'ReithSans',
        fontWeight: 700,
      },
      {
        name: 'BBCReithSerif_WNumbers_Lt',
        version: 'r2.512',
        subsets: true,
        fontFamily: 'ReithSerif',
        fontWeight: 300,
      },
    ];
    const getFont = location => {
      return new Promise(function (resolve, reject) {
        fetch(location)
          .then(function (res) {
            return res.blob();
          })
          .then(function (blob) {
            const reader = new FileReader();
            reader.addEventListener('load', function () {
              resolve(this.result);
              console.log(this.result);
            });
            reader.readAsDataURL(blob);
          })
          .catch(reject);
      });
    };
    fontsForStorage.forEach(font => {
      const storageKey = `font-${font.name}-${font.version}`;
      const fontContents = localStorage.getItem(storageKey);
      const head = document.head || document.getElementsByTagName('head')[0];
      const fontStylePlaceholder = document.createElement('style');
      fontStylePlaceholder.type = 'text/css';
      let styleInnerText = '';

      if (!fontContents) {
        // if this wasn't a poc, we'd go and get the contents of the font from somewhere else
        const fontLocation = `https://gel.files.bbci.co.uk/${font.version}${
          font.subsets ? '/subsets' : ''
        }/${font.name}.woff2`;
        window.setTimeout(() => {
          getFont(fontLocation).then(base64Contents => {
            const forStorage = {
              base64Contents,
              fontFamily: font.fontFamily,
              fontWeight: font.fontWeight,
            };
            localStorage.setItem(storageKey, JSON.stringify(forStorage));
            styleInnerText += `@font-face{font-family:: "${font.fontFamily}"; font-weight: ${font.fontWeight};src:url("${base64Contents}") format("woff2");font-display: swap;}`;
            fontStylePlaceholder.innerHTML = styleInnerText;
            head.appendChild(fontStylePlaceholder);
          });
        }, 0);
      } else {
        const { base64Contents, fontFamily, fontWeight } =
          JSON.parse(fontContents);
        styleInnerText += `@font-face{font-family: "${fontFamily}"; font-weight: ${fontWeight}; src:url("${base64Contents}") format("woff2");font-display: swap;}`;
        fontStylePlaceholder.innerHTML = styleInnerText;
        head.appendChild(fontStylePlaceholder);
      }
    });
  }, []);

  return (
    <>
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
