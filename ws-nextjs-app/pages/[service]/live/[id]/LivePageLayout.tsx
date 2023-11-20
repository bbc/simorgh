/** @jsx jsx */

import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import { ServiceContext } from '#contexts/ServiceContext';
import Pagination from '#app/components/Pagination';
import ChartbeatAnalytics from '#app/components/ChartbeatAnalytics';
import ATIAnalytics from '#app/components/ATIAnalytics';
import { ATIData } from '#app/components/ATIAnalytics/types';
import MetadataContainer from '../../../../../src/app/components/Metadata';
import LinkedDataContainer from '../../../../../src/app/components/LinkedData';
import Stream from './Stream';
import Header from './Header';
import KeyPoints from './KeyPoints';

import styles from './styles';
import { StreamResponse } from './Post/types';
import { KeyPointsResponse } from './KeyPoints/types';

type ComponentProps = {
  pageData: {
    title: string;
    description?: string;
    isLive: boolean;
    summaryPoints: { content: KeyPointsResponse | null };
    liveTextStream: {
      content: StreamResponse | null;
      contributors: string | null;
    };
    atiAnalytics: ATIData;
  };
};

const LivePage = ({ pageData }: ComponentProps) => {
  const { lang, translations } = useContext(ServiceContext);
  const {
    title,
    description,
    isLive,
    summaryPoints: { content: keyPoints },
    liveTextStream,
    atiAnalytics,
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

  const pageTitle = activePage && activePage >= 2 ? paginatedPageTitle : title;

  return (
    <>
      <ATIAnalytics atiData={atiAnalytics} />
      <ChartbeatAnalytics title={pageTitle} />
      <MetadataContainer
        title={pageTitle}
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
            <Stream
              streamContent={liveTextStream.content}
              contributors={liveTextStream.contributors}
            />
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
