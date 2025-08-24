/** @jsx jsx */

import React, { useContext, useEffect } from 'react';
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import ATIAnalytics from '#app/components/ATIAnalytics';
import ChartbeatAnalytics from '#app/components/ChartbeatAnalytics';
import Metadata from '#app/components/Metadata';
import CallToActionLink from '#app/components/CallToActionLink';
import { ServiceContext } from '#app/contexts/ServiceContext';
import TimeStampContainer from '#app/legacy/psammead/psammead-timestamp-container/src';
import LocalStorageButtons from './LocalStorageButtons';
import styles from './styles';
import { PageProps } from './types';

const MyBbcPageLayout = ({ service, pageData }: PageProps) => {
  const {
    lang,
    timezone,
    locale,
    altCalendar,
    script,
    translations: {
      myBbc: {
        instructions = 'You can download and view today’s news.',
        title = 'MyBBC',
      } = {},
    },
  } = useContext(ServiceContext);

  const capitalisedService = service[0].toUpperCase() + service.slice(1);
  const description = `${capitalisedService} Downloads`;
  const atiData = pageData?.metadata?.atiAnalytics || {};
  const pageTitle = pageData?.metadata?.pageTitle || '';
  
  const getTopic = (path) => {
      alert(path);
  };
    
//   useEffect(() => {
//     let myTopics;
//     // Get the value from local storage if it exists
//     myTopics = localStorage.getItem('ws_bbc_topics') || '{}';
//     myTopics = JSON.parse(myTopics);
//     if (myTopics && myTopics[service]) {
//         const topcats = Object.keys(myTopics[service]).filter(topic => myTopics[service][topic].count > 1).sort((a, b) => myTopics[service][b].count - myTopics[service][a].count);
//         const topiclist = document.getElementById('topicList');
//         topcats.forEach(topic => {
//             const listitem = document.createElement('LI');
//             const button = document.createElement('BUTTON');
//             button.innerText = topic;
//             button.onClick = getTopic(myTopics[service][topic].path);
//             listitem.appendChild(button);
//             topiclist.appendChild(listitem);
//         });
//     }
//   }, [service, getTopic]);
  return (
    <>
      <ATIAnalytics atiData={atiData} />
      <ChartbeatAnalytics title={pageTitle} />
      <Metadata
        title={title}
        lang={lang}
        description={description}
        openGraphType="website"
        hasAmpPage={false}
      />
      <div css={styles.grid}>
        <div css={styles.primaryColumn}>
          <main css={styles.mainContent}>
            <p>{instructions}</p>
            <Heading level={1}>{title}</Heading>
            <LocalStorageButtons service={service} />
          </main>
        </div>
      </div>
    </>
  );
};

export default MyBbcPageLayout;
