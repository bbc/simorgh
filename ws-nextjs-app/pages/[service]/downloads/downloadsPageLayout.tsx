/** @jsx jsx */

import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import ATIAnalytics from '#app/components/ATIAnalytics';
import ChartbeatAnalytics from '#app/components/ChartbeatAnalytics';
import Metadata from '#app/components/Metadata';
import CallToActionLink from '#app/components/CallToActionLink';
import { ServiceContext } from '#app/contexts/ServiceContext';
import TimeStampContainer from '#app/legacy/psammead/psammead-timestamp-container/src';
import styles from './styles';
import { PageProps } from './types';

const DownloadsPageLayout = ({ service, pageData }: PageProps) => {
  const {
    lang,
    timezone,
    locale,
    altCalendar,
    script,
    translations: {
      downloads: {
        instructions = 'You can download and view today’s news.',
        title = 'File Download',
      } = {},
    },
  } = useContext(ServiceContext);

  const description = `${service} Downloads`;
  return (
    <>
      <ATIAnalytics atiData={pageData.metadata.atiAnalytics} />
      <ChartbeatAnalytics title={pageData.metadata.pageTitle} />
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
            <ol css={styles.orderedList}>
              {pageData.downloadData?.map((item, index) => (
                <li css={styles.listItem} key={index}>
                  <TimeStampContainer
                    timestamp={item.fileCreated}
                    dateTimeFormat="DD MMMM YYYY"
                    format="D MMMM YYYY"
                    locale={locale}
                    timezone={timezone}
                    service={service}
                    script={script}
                    altCalendar={altCalendar}
                    padding={false}
                    isRelative={false}
                  />
                  <CallToActionLink css={styles.cta} href={item.files[0].fileLink} download={true} eventTrackingData={{ componentName: 'koreanDownloads', campaignID: 'korean_downloads', advertiserID: index }}>
                    <svg
                      className="ws-o-download-icon"
                      viewBox="0 0 32 32"
                      id="gel-icon-download"
                      width="16"
                      height="16"
                    >
                      <path d="M28.2 12.2L19 21.4V0h-6v21.4l-9.2-9.2L0 16l14 14H2v-6H0v8h16l16-16m-2 14h-8l-2 2h12v-8h-2" />
                    </svg>
                    <span>
                      {item.files[0].fileName}
                      <span>
                        {' '}
                        {(item.files[0].fileSize / 1000000).toFixed(1)}Mb
                      </span>
                    </span>
                  </CallToActionLink>
                </li>
              ))}
            </ol>
          </main>
        </div>
      </div>
    </>
  );
};

export default DownloadsPageLayout;
