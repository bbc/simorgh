/** @jsx jsx */

import React, { useContext, useState, useEffect } from 'react';
import { jsx } from '@emotion/react';
import { ServiceContext } from '#contexts/ServiceContext';
import Pagination from '#app/components/Pagination';
import ChartbeatAnalytics from '#app/components/ChartbeatAnalytics';
import ATIAnalytics from '#app/components/ATIAnalytics';
import { ATIData } from '#app/components/ATIAnalytics/types';
import fetchPageData from '#app/routes/utils/fetchPageData';
import usePolling from '../../../../hooks/usePolling';
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
    seo: Partial<{
      seoTitle: string;
      seoDescription: string;
      datePublished: string;
      dateModified: string;
    }>;
    atiAnalytics: ATIData;
  };
  id: string;
  variant: string;
};

const LivePage = ({ pageData }: ComponentProps) => {
  const { lang, translations } = useContext(ServiceContext);
  const [mutatablePageData, setMutatablePageData] = useState(pageData);

  const {
    title,
    description,
    seo: { seoTitle, seoDescription, datePublished, dateModified },
    isLive,
    summaryPoints: { content: keyPoints },
    liveTextStream,
    atiAnalytics,
  } = mutatablePageData;

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

  const { forceUpdate, updateFinished } = usePolling();

  useEffect(() => {
    if (forceUpdate) {
      // eslint-disable-next-line func-names
      (async function () {
        const path =
          'https://web-cdn.test.api.bbci.co.uk/fd/simorgh-bff?id=c7p765ynk9qt&service=pidgin&pageType=live&page=1&serviceEnv=test';
        const optHeaders = { 'ctx-service-env': 'test' };
        let pageJson;
        try {
          // @ts-expect-error Due to jsdoc inference, and no TS within fetchPageData
          const { json } = await fetchPageData({
            path,
            optHeaders,
          });

          pageJson = json;
        } catch (error) {
          console.log(error);
        }

        setMutatablePageData(pageJson.data);
        updateFinished();
      })();
    }
  }, [forceUpdate, updateFinished]);

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
        <Header
          showLiveLabel={isLive}
          title={title}
          description={description}
        />
        {/* <button type="button" onClick={() => refreshData()}>
          Refresh
        </button> */}
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
