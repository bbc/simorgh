/** @jsx jsx */

import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import { ServiceContext } from '#contexts/ServiceContext';
import Pagination from '#app/components/Pagination';
import ChartbeatAnalytics from '#app/components/ChartbeatAnalytics';
import ATIAnalytics from '#app/components/ATIAnalytics';
import { ATIData } from '#app/components/ATIAnalytics/types';
import { RequestContext } from '#app/contexts/RequestContext';
import MetadataContainer from '#app/components/Metadata';
import LinkedDataContainer from '#app/components/LinkedData';
import getLiveBlogPostingSchema from '#app/lib/seoUtils/getLiveBlogPostingSchema';
import Stream from './Stream';
import { StreamProvider } from './Stream/streamProvider';
import Header from './Header';
import KeyPoints from './KeyPoints';

import styles from './styles';
import { StreamResponse } from './Post/types';
import { KeyPointsResponse } from './KeyPoints/types';

interface LivePromoImage {
  url: string;
  urlTemplate?: string;
  altText?: string;
  width?: number;
  height?: number;
  copyright?: string;
}

type ComponentProps = {
  pageData: {
    title: string;
    description?: string;
    isLive: boolean;
    headerImage?: {
      url: string;
      urlTemplate: string;
      width: number;
    } | null;
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
    promoImage: LivePromoImage | null;
    startDateTime?: string;
    endDateTime?: string;
    metadata: { atiAnalytics: ATIData };
  };
  post: string | null;
};

const FakeKeyPointLinks = () => {
  return (
    <>
      <h3>Links to Posts (Server Side Rendering)</h3>
      <a href="http://localhost:7081/pidgin/live/c07zr0zwjnnt?renderer_env=test&post=asset%3A3b133574-88dc-41e0-9d90-0d3e847adba3#asset:3b133574-88dc-41e0-9d90-0d3e847adba3">
        Link for post 39 (Page 1)
      </a>
      <br />
      <a href="http://localhost:7081/pidgin/live/c07zr0zwjnnt?renderer_env=test&post=asset%3Aba735203-6eff-4768-83ce-74098a3ee92a#asset:ba735203-6eff-4768-83ce-74098a3ee92a">
        Link for post 32 (Page 2)
      </a>
      <br />
      <a href="http://localhost:7081/pidgin/live/c07zr0zwjnnt?renderer_env=test&post=asset%3Ab14bc99c-eb76-47ef-a716-f4ce97ff1349#asset:b14bc99c-eb76-47ef-a716-f4ce97ff1349">
        Link for post 12 (Page 3)
      </a>
    </>
  );
};

const LivePage = ({ pageData, post }: ComponentProps) => {
  const { lang, translations, defaultImage, brandName } =
    useContext(ServiceContext);
  const { canonicalNonUkLink } = useContext(RequestContext);
  const {
    title,
    description,
    seo: { seoTitle, seoDescription, datePublished, dateModified },
    startDateTime,
    endDateTime,
    isLive,
    summaryPoints: { content: keyPoints },
    liveTextStream,
    metadata: { atiAnalytics = undefined } = {},
    headerImage,
    promoImage,
  } = pageData;

  const {
    url: imageUrl,
    urlTemplate: imageUrlTemplate,
    width: imageWidth,
  } = headerImage || {};

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

  const liveBlogPostingSchema = getLiveBlogPostingSchema({
    posts: liveTextStream?.content?.data.results,
    brandName,
    defaultImage,
    url: canonicalNonUkLink,
    startDateTime,
    endDateTime,
  });

  return (
    <>
      <ATIAnalytics atiData={atiAnalytics} />
      <ChartbeatAnalytics title={pageTitle} />
      <MetadataContainer
        title={pageTitle}
        lang={lang}
        image={promoImage?.url}
        imageAltText={promoImage?.altText}
        imageWidth={promoImage?.width}
        imageHeight={promoImage?.height}
        description={pageDescription}
        openGraphType="website"
        hasAmpPage={false}
      />
      <LinkedDataContainer
        type="NewsArticle"
        seoTitle={pageTitle}
        headline={pageTitle}
        showAuthor
        promoImage={promoImage?.url}
        {...(datePublished && {
          datePublished,
        })}
        {...(dateModified && {
          dateModified,
        })}
        {...(liveBlogPostingSchema && {
          entities: [liveBlogPostingSchema],
        })}
      />
      <main>
        <Header
          showLiveLabel={isLive}
          title={title}
          description={description}
          imageUrl={imageUrl}
          imageUrlTemplate={imageUrlTemplate}
          imageWidth={imageWidth}
        />
        <div css={styles.outerGrid}>
          <div css={styles.firstSection}>
            {keyPoints && (
              <KeyPoints keyPointsContent={keyPoints.model.blocks} />
            )}
          </div>
          <div css={styles.secondSection}>
            <FakeKeyPointLinks />
            <StreamProvider post={post}>
              <Stream
                streamContent={liveTextStream.content}
                contributors={liveTextStream.contributors}
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
