/** @jsx jsx */

import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import { ServiceContext } from '#contexts/ServiceContext';
import nodeLogger from '#lib/logger.node';
import Pagination from '#app/components/Pagination';
import MetadataContainer from '../../../../../src/app/components/Metadata';
import LinkedDataContainer from '../../../../../src/app/components/LinkedData';
import Stream from './Stream';
import Header from './Header';
import KeyPoints from './KeyPoints';

import styles from './styles';
import { StreamResponse, Page } from './Post/types';

const logger = nodeLogger(__filename);

type ComponentProps = {
  bbcOrigin?: string;
  pageData: {
    title: string;
    description?: string;
    isLive: boolean;
    summaryPoints: { content: { model: { blocks: object[] } } | null };
    liveTextStream: { content: StreamResponse | null };
  };
  pathname?: string;
  showAdsBasedOnLocation?: boolean;
};

const LivePage = ({
  bbcOrigin,
  pageData,
  pathname,
  showAdsBasedOnLocation,
}: ComponentProps) => {
  const { lang, translations } = useContext(ServiceContext);
  const {
    title,
    description,
    isLive,
    summaryPoints: { content: summaryContent },
    liveTextStream,
  } = pageData;

  const { index: activePage, total: pageCount } =
    (liveTextStream?.content?.data?.page as Page) || {};

  const { pageXOfY, previousPage, nextPage, page } = {
    pageXOfY: 'Page {x} of {y}',
    previousPage: 'Previous Page',
    nextPage: 'Next Page',
    page: 'Page',
    ...translations.pagination,
  };

  const translatedPage = pageXOfY
    .replace('{x}', activePage.toString())
    .replace('{y}', pageCount.toString());

  const pageTitle = `Test Live Page, ${translatedPage}`;

  // TODO: Remove after testing
  logger.info('nextjs_client_render', {
    url: pathname,
  });

  return (
    <>
      <MetadataContainer
        title={activePage >= 2 ? pageTitle : title}
        lang={lang}
        description="A test Live Page using Next.JS"
        openGraphType="website"
        hasAmpPage={false}
      />
      <LinkedDataContainer type="CollectionPage" seoTitle="Test Live Page" />
      <main>
        <Header
          showLiveLabel={isLive}
          title={title}
          description={description}
        />
        <div css={styles.outerGrid}>
          <div css={styles.firstSection}>
            <KeyPoints keyPointBlocks={summaryContent?.model.blocks} />
          </div>
          <div css={styles.secondSection}>
            <Stream streamContent={liveTextStream.content} />
            <pre css={styles.code}>
              <Heading level={4}>Headers</Heading>
              {bbcOrigin && (
                <p>
                  bbc-origin: <span>{bbcOrigin}</span>
                </p>
              )}
              <p>
                bbc-adverts:{' '}
                <span>{showAdsBasedOnLocation ? 'true' : 'false'}</span>
              </p>
            </pre>
            <pre css={styles.code}>{JSON.stringify(pageData, null, 2)}</pre>
          </div>
        </div>
        <Pagination
          activePage={activePage}
          pageCount={pageCount}
          pageXOfY={pageXOfY}
          previousPage={previousPage}
          nextPage={nextPage}
          page={page}
        />
      </main>
    </>
  );
};

export default LivePage;
