/** @jsxRuntime classic */
/** @jsx jsx */

'use client';

import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { ATIData } from '#app/components/ATIAnalytics/types';
import ATIAnalytics from '#app/components/ATIAnalytics';
import ChartbeatAnalytics from '#app/components/ChartbeatAnalytics';
import Pagination from '#app/components/Pagination';
import Link from 'next/link';
import KeyPoints from '../../../../../pages/[service]/live/[id]/KeyPoints';
import MetadataContainer from '../../../../../../src/app/components/Metadata';
import LinkedDataContainer from '../../../../../../src/app/components/LinkedData';
import Stream from '../../../../../pages/[service]/live/[id]/Stream';
import Header from '../../../../../pages/[service]/live/[id]/Header';

import styles from './styles';
import { StreamResponse } from '../../../../../pages/[service]/live/[id]/Post/types';
import { KeyPointsResponse } from '../../../../../pages/[service]/live/[id]/KeyPoints/types';

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
    seo: Partial<{
      seoTitle: string;
      seoDescription: string;
      datePublished: string;
      dateModified: string;
    }>;
    atiAnalytics: ATIData;
  };
};

const LivePage = ({ pageData }: ComponentProps) => {
  const { lang, translations } = useContext(ServiceContext);
  const {
    title,
    description,
    seo: { seoTitle, seoDescription, datePublished, dateModified },
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

  const showPaginatedTitle = pageCount && activePage && activePage >= 2;

  const pageSeoTitle = seoTitle || title;

  const pageTitle = showPaginatedTitle
    ? `${pageSeoTitle}, ${pageXOfY
        .replace('{x}', activePage.toString())
        .replace('{y}', pageCount.toString())}`
    : pageSeoTitle;

  const pageDescription = seoDescription || description || pageSeoTitle;

  return (
    <>
      <ATIAnalytics atiData={atiAnalytics} />
      <ChartbeatAnalytics title={pageTitle} />
      <MetadataContainer
        title={pageTitle}
        lang={lang}
        description={pageDescription}
        openGraphType="website"
        hasAmpPage={false}
      />
      <LinkedDataContainer
        type="NewsArticle"
        seoTitle={pageTitle}
        headline={pageTitle}
        {...(datePublished && {
          datePublished,
        })}
        {...(dateModified && {
          dateModified,
        })}
        showAuthor
      />
      <main>
        <Link href="/pidgin/new_live_appdir/c7p765ynk9qt">Test Next Link</Link>
        <br />
        <a href="/pidgin/new_live_appdir/c7p765ynk9qt">Test Anchor Link</a>
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
