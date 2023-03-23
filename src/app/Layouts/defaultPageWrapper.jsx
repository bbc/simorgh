import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { node, shape, bool, number } from 'prop-types';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import GlobalStyles from '#psammead/psammead-styles/src/global-styles';
import styled from '@emotion/styled';
import WebVitals from '#containers/WebVitals';
import HeaderContainer from '#containers/Header';
import FooterContainer from '#containers/Footer';
import ManifestContainer from '#containers/Manifest';
import ServiceWorkerContainer from '#containers/ServiceWorker';
import { ServiceContext } from '../contexts/ServiceContext';
import { RequestContext } from '../contexts/RequestContext';
import ThemeProvider from '../components/ThemeProvider';
import fontFacesLazy from '../components/ThemeProvider/fontFacesLazy';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ darkMode }) =>
    props =>
      darkMode
        ? props.theme.palette.MIDNIGHT_BLACK
        : props.theme.palette.GHOST};
`;

const Content = styled.div`
  flex-grow: 1;
`;

const PageWrapper = ({ children, pageData, status }) => {
  const { service, variant } = useContext(ServiceContext);
  const { isAmp, isNextJs } = useContext(RequestContext);

  const isDarkMode = pathOr(false, ['darkMode'], pageData);
  const scriptSwitchId = pathOr('', ['scriptSwitchId'], pageData);
  const renderScriptSwitch = pathOr(true, ['renderScriptSwitch'], pageData);
  const isErrorPage = [404, 500].includes(status);
  const pageType = isErrorPage
    ? 'WS-ERROR-PAGE'
    : path(['metadata', 'type'], pageData);

  const serviceFonts = fontFacesLazy(service);
  const fontJs =
    isAmp || !serviceFonts.length || process.env.JEST_WORKER_ID !== undefined
      ? ''
      : `
  				if ("FileReader" in window && "Promise" in window && "fetch" in window) {
  				const fontsForStorage = ${JSON.stringify(serviceFonts)};
                const getFont = (location) => {
                	return new Promise(function (resolve, reject) {
						fetch(location).then(function (res) {
						  return res.blob()
						}).then(function (blob) {
						  if (blob && blob.constructor.name === 'Blob') {
							  var reader = new FileReader()
							  reader.addEventListener('load', function () {
								resolve(this.result)
							  })
							  reader.readAsDataURL(blob)
						  }
						}).catch(reject)
					  })
                };
                const createStyleAndAttach = (styleInnerText) => {
                    const head = document.head || document.getElementsByTagName('head')[0];
					const fontStylePlaceholder = document.createElement('style');
					fontStylePlaceholder.innerHTML = styleInnerText;
					head.appendChild(fontStylePlaceholder);
                };
                const retrieveAndStoreFont = (font, storageKey, shouldAttachStyle) => {
                	const fontLocation = font.src ? font.src : 'https://static.files.bbci.co.uk/fonts/reith/'+ font.version + (font.subsets ? '/subsets' : '') + '/' + font.name + '.woff2';
                    window.addEventListener("load", (e) => {
                    getFont(fontLocation).then((fontContents) => {
                    	const forStorage = { base64Contents: fontContents, fontFamily: font.fontFamily, fontWeight: font.fontWeight, fontVersion: font.version };
                    	localStorage.setItem(storageKey, JSON.stringify(forStorage));
                    	if (shouldAttachStyle) {
                    		const styleInnerText = '@font-face{font-family: "' + font.fontFamily + '"; font-weight: ' + font.fontWeight + ';src:url("' + fontContents + '") format("woff2");font-display: swap;}';
                    		createStyleAndAttach(styleInnerText);
                		}
                    });
                    });
                };
                fontsForStorage.forEach(font => {
                    const storageKey = 'font-' + font.name;
                    let fontContents = localStorage.getItem(storageKey);

                    if (!fontContents) {
                        retrieveAndStoreFont(font, storageKey, true);
                    }
                    else {
                    	const { base64Contents, fontFamily, fontWeight, fontVersion } = JSON.parse(fontContents);
                    	const styleInnerText = '@font-face{font-family: "' + fontFamily + '"; font-weight: ' + fontWeight + '; src:url("' + base64Contents + '") format("woff2");font-display: swap;}';
                		createStyleAndAttach(styleInnerText);
                		if (fontVersion !== font.version) {
                			retrieveAndStoreFont(font, storageKey, false);
                		}
                    }
                });
                }
    `;

  return (
    <>
      <Helmet
        script={[
          {
            type: 'text/javascript',
            innerHTML: fontJs,
          },
        ]}
      />
      <ThemeProvider service={service} variant={variant}>
        {!isNextJs && <ServiceWorkerContainer />}
        <ManifestContainer />
        <WebVitals pageType={pageType} />
        <GlobalStyles />
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
