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

  if (
    'FileReader' in window &&
    'Promise' in window &&
    'fetch' in window &&
    'localStorage' in window
  ) {
    var getFont = function getFontRequest(location: string) {
      return new Promise(function fontPromise(resolve, reject) {
        fetch(location)
          .then(function getBlob(res) {
            return res.blob();
          })
          .then(function readBlob(blob) {
            if (blob && blob.constructor.name === 'Blob') {
              var reader = new FileReader();
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
      var head = document.head || document.getElementsByTagName('head')[0];
      var fontStylePlaceholder = document.createElement('style');
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
          var forStorage = {
            base64Contents: fontContents,
            fontFamily: font.fontFamily,
            fontWeight: font.fontWeight,
            fontVersion: font.version,
          };
          localStorage.setItem(storageKey, JSON.stringify(forStorage));

          if (shouldAttachStyle) {
            var styleInnerText =
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
      var storageKey = 'font-' + font.name;
      var fontContents = localStorage.getItem(storageKey);

      if (!fontContents) {
        retrieveAndStoreFont(font, storageKey, true);
      } else {
        var parsedFontContents = JSON.parse(fontContents);
        var styleInnerText =
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

  if ('localStorage' in window) {
    var wrappedPageTimeStart = new Date();
    var wrappedYear = wrappedPageTimeStart.getFullYear();
    var wrappedMonth = wrappedPageTimeStart.getMonth() + 1;
    var wrappedStorageKey = 'ws_bbc_wrapped';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var wrappedContents: Record<string, any> = {};
    var topicsStorageKey = 'ws_bbc_topics';
    var topicsContents = JSON.parse(
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

    // eslint-disable-next-line no-inner-declarations
    function saveWrapped() {
      localStorage.setItem(wrappedStorageKey, JSON.stringify(wrappedContents));
    }

    var wrappedLocalStorageContents = localStorage.getItem(wrappedStorageKey);

    if (wrappedLocalStorageContents) {
      var wrappedLocalStorageContentsParsed = JSON.parse(
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
          wrappedLocalStorageContentsParsed[wrappedYear].byMonth[
            wrappedMonth
          ] || 0;
      }
    }

    var wrappedContentsShortcut = wrappedContents[wrappedYear];

    if (wrappedTopics) {
      wrappedTopics.forEach(function setTopicCount(topic) {
        var topicName = topic.topicName;
        var topicId = topic.topicId;

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
        var wrappedTimeNow = new Date();
        var wrappedDifference =
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
  }
};

export default setPageWrapperInlineJs;
