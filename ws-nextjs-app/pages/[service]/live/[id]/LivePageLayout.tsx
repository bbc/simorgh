/** @jsx jsx */

import React, { useRef, useContext } from 'react';
import { jsx } from '@emotion/react';
import { ServiceContext } from '#contexts/ServiceContext';
import Pagination from '#app/components/Pagination';
import ChartbeatAnalytics from '#app/components/ChartbeatAnalytics';
import ATIAnalytics from '#app/components/ATIAnalytics';
import { ATIData } from '#app/components/ATIAnalytics/types';
import Link from 'next/link';
import MetadataContainer from '../../../../../src/app/components/Metadata';
import LinkedDataContainer from '../../../../../src/app/components/LinkedData';
import Stream from './Stream';
import {
  StreamContext,
  StreamProvider,
} from './Stream/BackToLatest/stream-provider';
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
  post: string | null;
};

const MyLinks = () => {
  // const linkOnClickOverride = event => {
  //   const tldRegex = /(.co.uk|.com)/;
  //   const targetUrl = new URL(event.target.href);
  //   const currentUrl = new URL(window.location.href);

  //   // TLDs and .app are removed when comparing to avoid redirect loop for users
  //   const isOnSameHost =
  //     targetUrl.host.replace(tldRegex, '') ===
  //     currentUrl.host.replace(tldRegex, '');
  //   const isOnSamePath =
  //     targetUrl.pathname === currentUrl.pathname.replace('.app', '');

  //   const postSearchParam = targetUrl.searchParams.get('post');
  //   const newPath = `${currentUrl.pathname}?${targetUrl.searchParams}${targetUrl.hash}`;

  //   // only override behaviour if on same page and has post
  //   if (isOnSameHost && isOnSamePath && postSearchParam) {
  //     event.preventDefault();
  //     setPost(postSearchParam);
  //     window.history.pushState(null, null, newPath);
  //   }

  //   const linkTrackingOverride = {
  //     group: {
  //       name: 'Summary Points'
  //     }
  //   };

  //   const propObj = {
  //     headingLevel: 2,
  //     blocksOverride: data,
  //     isContained: true,
  //     isFullWidth: true,
  //     headingFontScale: 'indexHeadlineMedium',
  //     overrides: {
  //       linkTrackingOverride,
  //       linkOnClickOverride
  //     }
  //   };

  //   return (
  //     <>
  //       <Heading fontScale="indexHeadlineMedium" level="2" type="section-heading">
  //         {'Summary'}
  //       </Heading>
  //       <EditorialText {...propObj} />
  //     </>
  //   );
  // };
  // /**
  //  * Summary Points module for showing Editorial Text retrieved from Tipo
  //  * @type {typeof import('./summary-points').SummaryPoints}
  //  */
  // export const SummaryPoints = ({ data, setPost }) => {
  //   return (
  //     <SummaryPointsWrapper hasData={data?.length > 0} id="summaryPoints">
  //       {Boolean(data?.length) && SummaryPointsContainer({ data, setPost })}
  //     </SummaryPointsWrapper>
  //   );
  // };
  // };

  return (
    <>
      {/* <Link href="http://localhost:7081/pidgin/live/c07zr0zwjnnt?post=asset%3A3b133574-88dc-41e0-9d90-0d3e847adba3#post"> */}
      <Link href="http://localhost:7081/pidgin/live/c07zr0zwjnnt?post=asset%3A3b133574-88dc-41e0-9d90-0d3e847adba3">
        Link for post 39 (Page 1)
      </Link>
      <br />
      <Link href="http://localhost:7081/pidgin/live/c07zr0zwjnnt?post=asset%3Aba735203-6eff-4768-83ce-74098a3ee92a#post">
        Link for post 32 (Page 2)
      </Link>
      <br />
      <Link href="http://localhost:7081/pidgin/live/c07zr0zwjnnt?post=asset%3Ab14bc99c-eb76-47ef-a716-f4ce97ff1349#post">
        Link for post 12 (Page 3)
      </Link>
    </>
  );
};

const LivePage = ({ pageData, post }: ComponentProps) => {
  const streamRef = useRef(null);
  const hiddenHeadlineRef = useRef(null);

  console.log("I'm the streamRef", streamRef);
  console.log("I'm the hiddenHeadlineRef", hiddenHeadlineRef);

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
            <MyLinks />
            <StreamProvider
              streamRef={streamRef}
              post={post}
              setPage={undefined}
              setPost={undefined}
              activePage={activePage}
              hiddenHeadlineRef={hiddenHeadlineRef}
            >
              <Stream
                streamContent={liveTextStream.content}
                contributors={liveTextStream.contributors}
                post={post}
                streamRef={streamRef}
                hiddenHeadlineRef={hiddenHeadlineRef}
              />
            </StreamProvider>
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
