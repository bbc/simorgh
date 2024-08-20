/** @jsx jsx */
/* @jsxFrag React.Fragment */

import React, { PropsWithChildren, useContext } from 'react';
import { jsx } from '@emotion/react';
import { Helmet } from 'react-helmet';
import pathOr from 'ramda/src/pathOr';

import GlobalStyles from '#psammead/psammead-styles/src/global-styles';
import { PageTypes } from '#app/models/types/global';
import WebVitals from '../../legacy/containers/WebVitals';
import HeaderContainer from '../../legacy/containers/Header';
import FooterContainer from '../../legacy/containers/Footer';
import ManifestContainer from '../../legacy/containers/Manifest';
import ServiceWorker from '../ServiceWorker';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import fontFacesLazy from '../ThemeProvider/fontFacesLazy';

import styles from './index.styles';

type ModelType = {
  blocks?: [
    {
      type: string;
      text?: string;
      model?: ModelType;
    },
  ];
  text?: string;
};

type Props = {
  pageData: {
    metadata: {
      type: PageTypes;
      topics?: [
        {
          topicName: string;
        },
      ];
    };
    content?: {
      model?: ModelType;
    };
  };
  status: number;
};

type wordCountType = number | undefined;

const PageLayoutWrapper = ({
  children,
  pageData,
  status,
}: PropsWithChildren<Props>) => {
  const { service } = useContext(ServiceContext);
  const { isLite, isAmp } = useContext(RequestContext);

  const scriptSwitchId = pathOr('', ['scriptSwitchId'], pageData);
  const renderScriptSwitch = pathOr(true, ['renderScriptSwitch'], pageData);

  const isErrorPage = ![200].includes(status) || !status;
  const pageType = pageData?.metadata?.type;
  const reportingPageType = pageType?.replace(/ /g, '');
  let wordCount: wordCountType = 0;
  if (pageType === 'article') {
    wordCount = pageData?.content?.model?.blocks
      ?.filter(block => block.type === 'text')
      ?.reduce((reducer, block) => {
        const innerBlocks = block?.model?.blocks
          ?.filter(innerBlock => innerBlock.type === 'paragraph')
          .reduce((innerReducer, p) => {
            return `${innerReducer} ${p.model?.text}`;
          }, '');

        if (!innerBlocks) return reducer;
        return reducer + innerBlocks.split(' ').length;
      }, 0);
  }
  const serviceFonts = fontFacesLazy(service);
  const fontJs =
    isLite ||
    isAmp ||
    !serviceFonts.length ||
    process.env.JEST_WORKER_ID !== undefined
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
                let wrappedPageTimeStart = new Date();
                let wrappedYear = wrappedPageTimeStart.getFullYear();
                let wrappedMonth = wrappedPageTimeStart.getMonth() + 1;
                let wrappedStorageKey = 'ws_bbc_wrapped';
                let wrappedContents = {};
                wrappedContents[wrappedYear] = {
                    'byMonth': {},
                    'pageTypeCounts': {},
                    'serviceCounts': {},
                    'topicCounts': {},
                    'duration': 0,
                    'wordCount': 0,
                };
                wrappedContents[wrappedYear].byMonth[wrappedMonth] = 0;
                let saveWrapped = () => {
                    localStorage.setItem(wrappedStorageKey, JSON.stringify(wrappedContents));
                }
                let wrappedLocalStorageContents = localStorage.getItem(wrappedStorageKey);
                if (wrappedLocalStorageContents) {
                    const wrappedLocalStorageContentsParsed = JSON.parse(wrappedLocalStorageContents);
                    if (wrappedLocalStorageContentsParsed.hasOwnProperty(wrappedYear)) {
                        wrappedContents[wrappedYear] = wrappedLocalStorageContentsParsed[wrappedYear] || wrappedContents[wrappedYear];
                        wrappedContents[wrappedYear].byMonth[wrappedMonth] = wrappedLocalStorageContentsParsed[wrappedYear].byMonth[wrappedMonth] || 0;
                    }
                }
                let wrappedContentsShortcut = wrappedContents[wrappedYear];
                let wrappedTopics = ${JSON.stringify(
                  pageData?.metadata?.topics,
                )};
                if (wrappedTopics) {
                    wrappedTopics.forEach(({ topicName }) => {
                        wrappedContentsShortcut.topicCounts[topicName] = wrappedContentsShortcut.topicCounts[topicName] ? wrappedContentsShortcut.topicCounts[topicName] + 1 : 1;
                    });
                }
                document.onvisibilitychange = () => {
                  if (document.visibilityState === "hidden") {
                    const wrappedTimeNow = new Date();
                    const wrappedDifference = wrappedTimeNow - wrappedPageTimeStart;
                    wrappedContentsShortcut.duration = wrappedContentsShortcut.duration ? wrappedContentsShortcut.duration + wrappedDifference : wrappedDifference;
                    saveWrapped();
                  }
                  else {
                    wrappedPageTimeStart = new Date();
                  }
                };
                wrappedContentsShortcut.wordCount = wrappedContentsShortcut.wordCount + ${wordCount};
                wrappedContentsShortcut.serviceCounts.${service} = wrappedContentsShortcut.serviceCounts.${service} ? wrappedContentsShortcut.serviceCounts.${service} + 1 : 1;
                wrappedContentsShortcut.pageTypeCounts.${reportingPageType} = wrappedContentsShortcut.pageTypeCounts.${reportingPageType} ? wrappedContentsShortcut.pageTypeCounts.${reportingPageType} + 1 : 1;
                wrappedContentsShortcut.byMonth[wrappedMonth] = wrappedContentsShortcut.byMonth[wrappedMonth] ? wrappedContentsShortcut.byMonth[wrappedMonth] + 1 : 1;
                wrappedContents[wrappedYear] = wrappedContentsShortcut;
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
      <ServiceWorker />
      <ManifestContainer />
      {!isErrorPage && <WebVitals pageType={pageType} />}
      <GlobalStyles />
      <div id="main-wrapper" css={styles.wrapper}>
        <HeaderContainer
          scriptSwitchId={scriptSwitchId}
          renderScriptSwitch={renderScriptSwitch}
        />
        <div css={styles.content}>{children}</div>
        <FooterContainer />
      </div>
    </>
  );
};

export default PageLayoutWrapper;
