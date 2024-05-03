/** @jsx jsx */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import Metadata from '#app/components/Metadata';
import { ServiceContext } from '#app/contexts/ServiceContext';
import onClient from '#app/lib/utilities/onClient';
import getAgent from '../../../utilities/undiciAgent';
import styles from './styles';
import { PageProps } from './types';

const downloadsPageLayout = ({ service, pageData }: PageProps) => {
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
      },
    },
  } = useContext(ServiceContext);
  //   const { title } = translations.downloads;
  const { description } = pageData;
  console.log('pageData.downloadData', pageData.downloadData[0].files);
  return (
    <>
      <Metadata
        title={title}
        lang={lang}
        description="Test UGC Form"
        openGraphType="website"
        hasAmpPage={false}
      />
      <div css={styles.grid}>
        <div css={styles.primaryColumn}>
          <main css={styles.mainContent}>
            <p>{instructions}</p>
            <Heading level={1}>{title}</Heading>
            <ol>
              {pageData.downloadData.map((item, index) => (
                <li>
                  {item.fileCreated}
                  <a href="{item.files[0].fileLink}">
                    {item.files[0].fileName} (
                    {(item.files[0].fileSize / 1000000).toFixed(1)}Mb)
                  </a>
                </li>
              ))}
            </ol>
          </main>
        </div>
      </div>
    </>
  );
};

export default downloadsPageLayout;
