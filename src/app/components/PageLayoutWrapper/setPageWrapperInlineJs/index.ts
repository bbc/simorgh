/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable func-names */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-template */
import { FontInfo } from '../../ThemeProvider/fontFaces';

export type PageWrapperInlineJsTopic = {
  topicName: string;
  topicId: string;
};

export type PageWrapperInlineJsParams = {
  serviceFonts: FontInfo[];
  wrappedTopics?: PageWrapperInlineJsTopic[];
  service: string;
  wordCount?: number;
  reportingPageType?: string;
};

const setPageWrapperInlineJs = function (params: PageWrapperInlineJsParams) {
  var serviceFonts = params.serviceFonts;
  var wrappedTopics = params.wrappedTopics;
  var service = params.service;
  var wordCount = params.wordCount;
  var reportingPageType = String(params.reportingPageType);

  if ('FileReader' in window && 'Promise' in window && 'fetch' in window) {
    var getFont = function getFontRequest(location: string) {
      return new Promise(function fontPromise(resolve, reject) {
        fetch(location)
          .then(function getBlob(res) {
            return res.blob();
          })
          .then(function readBlob(blob) {
            if (blob && blob.constructor.name === 'Blob') {
              const reader = new FileReader();
              reader.addEventListener('load', function onLoad() {
                resolve(reader.result);
              });
              reader.readAsDataURL(blob);
            }
          })
          .catch(reject);
      });
    };

    var createStyleAndAttach = function attachFontStyle(
      styleInnerText: string,
    ) {
      const head = document.head || document.getElementsByTagName('head')[0];
      const fontStylePlaceholder = document.createElement('style');
      fontStylePlaceholder.innerHTML = styleInnerText;
      head.appendChild(fontStylePlaceholder);
    };

    var retrieveAndStoreFont = function retrieveAndStoreFontImpl(
      font: FontInfo,
      storageKey: string,
      shouldAttachStyle: boolean,
    ) {
      window.addEventListener('load', function onWindowLoad() {
        getFont(font.downloadSrc).then(function onFontRetrieved(fontContents) {
          const forStorage = {
            base64Contents: fontContents,
            fontFamily: font.fontFamily,
            fontWeight: font.fontWeight,
            fontVersion: font.version,
          };
          localStorage.setItem(storageKey, JSON.stringify(forStorage));

          if (shouldAttachStyle) {
            const styleInnerText =
              '@font-face{font-family: "' +
              font.fontFamily +
              '"; font-weight: ' +
              font.fontWeight +
              ';src:url("' +
              fontContents +
              '") format("woff2");font-display: swap;}';
            createStyleAndAttach(styleInnerText);
          }
        });
      });
    };

    serviceFonts.forEach(function setFont(font) {
      const storageKey = 'font-' + font.name;
      const fontContents = localStorage.getItem(storageKey);

      if (!fontContents) {
        retrieveAndStoreFont(font, storageKey, true);
      } else {
        const parsedFontContents = JSON.parse(fontContents);
        const styleInnerText =
          '@font-face{font-family: "' +
          parsedFontContents.fontFamily +
          '"; font-weight: ' +
          parsedFontContents.fontWeight +
          '; src:url("' +
          parsedFontContents.base64Contents +
          '") format("woff2");font-display: swap;}';
        createStyleAndAttach(styleInnerText);

        if (parsedFontContents.fontVersion !== font.version) {
          retrieveAndStoreFont(font, storageKey, false);
        }
      }
    });
  }

  var wrappedPageTimeStart = new Date();
  const wrappedYear = wrappedPageTimeStart.getFullYear();
  const wrappedMonth = wrappedPageTimeStart.getMonth() + 1;
  const wrappedStorageKey = 'ws_bbc_wrapped';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wrappedContents: Record<string, any> = {};
  const topicsStorageKey = 'ws_bbc_topics';
  const topicsContents = JSON.parse(
    localStorage.getItem(topicsStorageKey) || '{}',
  );

  wrappedContents[wrappedYear] = {
    byMonth: {},
    pageTypeCounts: {},
    serviceCounts: {},
    topicCounts: {},
    duration: 0,
    wordCount: 0,
  };
  wrappedContents[wrappedYear].byMonth[wrappedMonth] = 0;

  function saveWrapped() {
    localStorage.setItem(wrappedStorageKey, JSON.stringify(wrappedContents));
  }

  const wrappedLocalStorageContents = localStorage.getItem(wrappedStorageKey);

  if (wrappedLocalStorageContents) {
    const wrappedLocalStorageContentsParsed = JSON.parse(
      wrappedLocalStorageContents,
    );

    if (
      Object.prototype.hasOwnProperty.call(
        wrappedLocalStorageContentsParsed,
        wrappedYear,
      )
    ) {
      wrappedContents[wrappedYear] =
        wrappedLocalStorageContentsParsed[wrappedYear] ||
        wrappedContents[wrappedYear];
      wrappedContents[wrappedYear].byMonth[wrappedMonth] =
        wrappedLocalStorageContentsParsed[wrappedYear].byMonth[wrappedMonth] ||
        0;
    }
  }

  const wrappedContentsShortcut = wrappedContents[wrappedYear];

  if (wrappedTopics) {
    wrappedTopics.forEach(function setTopicCount(topic) {
      const topicName = topic.topicName;
      const topicId = topic.topicId;

      if (!topicsContents[service]) {
        topicsContents[service] = {};
      }

      if (topicsContents[service][topicName]) {
        topicsContents[service][topicName].count += 1;
      } else {
        topicsContents[service][topicName] = {
          count: 1,
          id: topicId,
          path: '/' + service + '/topics/' + topicId,
        };
      }

      wrappedContentsShortcut.topicCounts[topicName] = wrappedContentsShortcut
        .topicCounts[topicName]
        ? wrappedContentsShortcut.topicCounts[topicName] + 1
        : 1;
    });
  }

  document.onvisibilitychange = function onVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      const wrappedTimeNow = new Date();
      const wrappedDifference =
        wrappedTimeNow.getTime() - wrappedPageTimeStart.getTime();
      wrappedContentsShortcut.duration = wrappedContentsShortcut.duration
        ? wrappedContentsShortcut.duration + wrappedDifference
        : wrappedDifference;
      saveWrapped();
    } else {
      wrappedPageTimeStart = new Date();
    }
  };

  wrappedContentsShortcut.wordCount += wordCount;
  wrappedContentsShortcut.serviceCounts[service] = wrappedContentsShortcut
    .serviceCounts[service]
    ? wrappedContentsShortcut.serviceCounts[service] + 1
    : 1;
  wrappedContentsShortcut.pageTypeCounts[reportingPageType] =
    wrappedContentsShortcut.pageTypeCounts[reportingPageType]
      ? wrappedContentsShortcut.pageTypeCounts[reportingPageType] + 1
      : 1;
  wrappedContentsShortcut.byMonth[wrappedMonth] = wrappedContentsShortcut
    .byMonth[wrappedMonth]
    ? wrappedContentsShortcut.byMonth[wrappedMonth] + 1
    : 1;
  wrappedContents[wrappedYear] = wrappedContentsShortcut;
  localStorage.setItem(topicsStorageKey, JSON.stringify(topicsContents));
};

export default setPageWrapperInlineJs;
