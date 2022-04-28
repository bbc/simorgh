import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
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
  const fonts = fontFunctions.map(getFonts => getFonts());

  const isDarkMode = pathOr(false, ['darkMode'], pageData);
  const isErrorPage = [404, 500].includes(status);
  const pageType = isErrorPage
    ? 'WS-ERROR-PAGE'
    : path(['metadata', 'type'], pageData);

  useEffect(() => {
    // import('webfontloader').then(WebFontLoader => {
//         window.setTimeout(() => {
//             WebFontLoader.timer = WebFontLoader.timer || {};
//             WebFontLoader.timer['ReithSerif'] = (Date.now() / 1000);
//             WebFontLoader.timer['ReithSans'] = (Date.now() / 1000);
//             const cssContent = fonts.join('');
//             const head = document.head || document.getElementsByTagName('head')[0];
//             const styleElement = document.createElement('style');
//             head.appendChild(styleElement);
//             styleElement.type = 'text/css';
//             styleElement.appendChild(document.createTextNode(cssContent));
//  
//             WebFontLoader.load({
//               timeout: 300,
//               custom: {
//                 families: ['ReithSerif', 'ReithSans'],
//                 urls: ['https://news.test.files.bbci.co.uk/include/vjassets/css/reith.css']
//               },
//               fontloading: (familyName, fvd) => {
//                 WebFontLoader.timer = WebFontLoader.timer || {};
//                 if (!WebFontLoader.timer.hasOwnProperty(familyName)) {
//                     console.log('adsfadadsfsasdfafasdf');
//                     WebFontLoader.timer[familyName] = Math.floor(Date.now() / 1000);;
//                 }
//                 console.log(`loading the ${familyName} - ${fvd}`);
//               },
//               fontinactive: (familyName, fvd) => {
//                 console.log(`failed to load the ${familyName} - ${fvd}`);
//               },
//               fontactive: (familyName, fvd) => {
//                 const secondsToLoad = (((Date.now() / 1000) - WebFontLoader.timer[familyName]));
//                 console.log(`loaded the ${familyName} - ${fvd} in ${secondsToLoad}`);
//               },
//             });
//         }, 0);
//     });
        // const fontsForStorage = [
//             {
//                 "name": "ReithSerif_M",
//                 "version": 1
//             },
//             {
//                 "name": "ReithSans_R",
//                 "version": 1
//             }
//         ];
//         const head = document.head || document.getElementsByTagName('head')[0];
//         const fontStylePlaceholder = document.createElement('style');
//         fontStylePlaceholder.type = 'text/css';
//         let styleInnerText = '';
//         fontsForStorage.forEach(font => {
//             const storageKey = `font-${font.name}-${font.version}`;
//             let fontContents = localStorage.getItem(storageKey);
// 
//             
//             if (!fontContents) {
//                 // if this wasn't a poc, we'd go and get the contents of the font from somewhere else
//             }
// 
//             styleInnerText += `@font-face{${fontContents};font-display: swap;}`;
//         });
//         fontStylePlaceholder.innerHTML = styleInnerText;
//         head.appendChild(fontStylePlaceholder);
  });

  return (
    <>
      <Helmet
        script={[{ 
    type: 'text/javascript', 
    innerHTML: `

            const fontsForStorage = [
            {
                "name": "ReithSerif_M",
                "version": 1
            },
            {
                "name": "ReithSans_R",
                "version": 1
            }
        ];
        const head = document.head || document.getElementsByTagName('head')[0];
        const fontStylePlaceholder = document.createElement('style');
        fontStylePlaceholder.type = 'text/css';
        let styleInnerText = '';
        fontsForStorage.forEach(font => {
            const storageKey = 'font-' + font.name + '-' + font.version;
            let fontContents = localStorage.getItem(storageKey);

            
            if (!fontContents) {
                // if this wasn't a poc, we'd go and get the contents of the font from somewhere else
            }

            styleInnerText += '@font-face{' + fontContents + ';font-display: swap;}';
        });
        fontStylePlaceholder.innerHTML = styleInnerText;
        head.appendChild(fontStylePlaceholder);`
          }]} 
      />
      <GlobalStyles />
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
