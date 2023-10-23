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
import { StreamResponse } from './Post/types';
import { KeyPointsResponse } from './KeyPoints/types';

const logger = nodeLogger(__filename);

type ComponentProps = {
  bbcOrigin?: string;
  pageData: {
    title: string;
    description?: string;
    isLive: boolean;
    summaryPoints: { content: KeyPointsResponse | null };
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
    summaryPoints: { content: keyPoints },
    liveTextStream,
  } = pageData;

  const { index: activePage, total: pageCount } =
    liveTextStream?.content?.data?.page || {};

  const { pageXOfY, previousPage, nextPage, page } = {
    pageXOfY: 'Page {x} of {y}',
    previousPage: 'Previous Page',
    nextPage: 'Next Page',
    page: 'Page',
    ...translations.pagination,
  };

  const paginatedPageTitle =
    activePage && pageCount
      ? `Test Live Page, ${pageXOfY
          .replace('{x}', activePage.toString())
          .replace('{y}', pageCount.toString())}`
      : 'Test Live Page';

  // TODO: Remove after testing
  logger.info('nextjs_client_render', {
    url: pathname,
  });

  return (
    <>
      <MetadataContainer
        title={activePage && activePage >= 2 ? paginatedPageTitle : title}
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
            {keyPoints && (
              <KeyPoints keyPointsContent={keyPoints.model.blocks} />
            )}
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
