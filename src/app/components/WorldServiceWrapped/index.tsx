/** @jsxRuntime classic */
/** @jsx jsx */
/* @jsxFrag React.Fragment */

import React, { PropsWithChildren, useContext, useEffect } from 'react';
import { jsx } from '@emotion/react';
import { Helmet } from 'react-helmet';
import { PageTypes } from '#app/models/types/global';

import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';

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
};

type wordCountType = number | undefined;

const WorldServiceWrapped = ({
  children,
  pageData,
}: PropsWithChildren<Props>) => {
    const { service } = useContext(ServiceContext);
    const { isAmp, isNextJs, variant } = useContext(RequestContext);
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
    useEffect(() => {
        if (!isAmp) {
            let wrappedPageTimeStart = new Date();
            const wrappedYear = wrappedPageTimeStart.getFullYear();
            const wrappedMonth = wrappedPageTimeStart.getMonth() + 1;
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
            const saveWrapped = () => {
                localStorage.setItem(wrappedStorageKey, JSON.stringify(wrappedContents));
            }
            let wrappedLocalStorageContents = localStorage.getItem(wrappedStorageKey);
            if (wrappedLocalStorageContents) {
                const wrappedLocalStorageContentsParsed = JSON.parse(wrappedLocalStorageContents);
                wrappedContents[wrappedYear] = wrappedLocalStorageContentsParsed[wrappedYear] || wrappedLocalStorageContentsParsed;
                wrappedContents[wrappedYear].byMonth[wrappedMonth] = wrappedLocalStorageContentsParsed[wrappedYear].byMonth[wrappedMonth] || 0;
            }
            const wrappedContentsShortcut = wrappedContents[wrappedYear];
            const wrappedTopics = pageData?.metadata?.topics;
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
            wrappedContentsShortcut.wordCount = wrappedContentsShortcut.wordCount + wordCount;
            wrappedContentsShortcut.serviceCounts[service] = wrappedContentsShortcut.serviceCounts[service] ? wrappedContentsShortcut.serviceCounts[service] + 1 : 1;
            wrappedContentsShortcut.pageTypeCounts[reportingPageType] = wrappedContentsShortcut.pageTypeCounts[reportingPageType] ? wrappedContentsShortcut.pageTypeCounts[reportingPageType] + 1 : 1;
            wrappedContentsShortcut.byMonth[wrappedMonth] = wrappedContentsShortcut.byMonth[wrappedMonth] ? wrappedContentsShortcut.byMonth[wrappedMonth] + 1 : 1;
            wrappedContents[wrappedYear] = wrappedContentsShortcut;
        }
    });
    return null;
};
export default WorldServiceWrapped;