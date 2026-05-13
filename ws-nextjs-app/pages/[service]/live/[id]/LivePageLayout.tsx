import { use, useState, useRef, RefObject } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import Pagination from '#app/components/Pagination';
import PortraitVideoCarousel from '#app/components/PortraitVideoCarousel';
import ChartbeatAnalytics from '#app/components/ChartbeatAnalytics';
import ATIAnalytics from '#app/components/ATIAnalytics';
import { ATIData } from '#app/components/ATIAnalytics/types';
import { RequestContext } from '#app/contexts/RequestContext';
import MetadataContainer from '#app/components/Metadata';
import LinkedDataContainer from '#app/components/LinkedData';
import getLiveBlogPostingSchema from '#app/lib/seoUtils/getLiveBlogPostingSchema';
import { MediaCollection } from '#app/components/MediaLoader/types';
import HeadToHeadV2 from '#app/components-webcore/SportDataHeader/head-to-head-v2';
import { HeadToHeadV2Data } from '#app/components-webcore/SportDataHeader/head-to-head-v2/types';
import { PortraitVideoItems } from '#app/models/types/optimo';
import useLivePagePolling from '#app/hooks/useLivePagePolling';
import useToggle from '#app/hooks/useToggle';
import isLiveEnv from '#app/lib/utilities/isLive';
import {
  getImageFromPost,
  getHeadlineFromPost,
} from '../../../../utilities/getFromPost';
import Stream from './Stream';
import Header from './Header';
import KeyPoints from './KeyPoints';
import styles from './styles';
import { StreamResponse } from './Post/types';
import { KeyPointsResponse } from './KeyPoints/types';
import LatestPostButton from './LatestPostButton';

interface LivePromoImage {
  url: string;
  urlTemplate?: string;
  altText?: string;
  width?: number;
  height?: number;
  copyright?: string;
}

export type ComponentProps = {
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
      id: string;
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
    mediaCollections: MediaCollection[] | null;
    portraitVideoItems?: PortraitVideoItems | null;
    sportDataEventContent?: {
      id: string;
      content: {
        data: {
          live: boolean;
          sportDataEvent: HeadToHeadV2Data;
          title: string;
        };
      };
    } | null;
  };
};

interface LivePageProps extends ComponentProps {
  assetId?: string | null;
}

const LivePage = ({ pageData, assetId }: LivePageProps) => {
  const { lang, translations, defaultImage, brandName } = use(ServiceContext);
  const { canonicalNonUkLink } = use(RequestContext);
  const { enabled: livePagePollingEnabled } = useToggle('livePagePolling');

  const streamRef = useRef<HTMLDivElement>(null);
  const [isFirstPostVisible, setIsFirstPostVisible] = useState(true);

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
    mediaCollections,
    portraitVideoItems,
    sportDataEventContent,
  } = pageData;

  const { currentStreamData, hasPendingUpdate, applyPendingUpdate } =
    useLivePagePolling(pageData, livePagePollingEnabled && isLive);

  const sportData = sportDataEventContent?.content?.data?.sportDataEvent;
  const isSportDataLive = sportDataEventContent?.content?.data?.live;
  const sportDataTitle = sportDataEventContent?.content?.data?.title;
  const showSportData = !!sportData && !isLiveEnv();

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

  const postWithMatchingAssetId =
    assetId && liveTextStream?.content?.data?.results
      ? liveTextStream.content.data.results.find(post => post.urn === assetId)
      : null;

  const imageFromPost = postWithMatchingAssetId
    ? getImageFromPost(postWithMatchingAssetId)
    : null;

  const metaImage = imageFromPost || promoImage;

  const headlineFromPost = postWithMatchingAssetId
    ? getHeadlineFromPost(postWithMatchingAssetId)
    : null;

  const metaTitle = headlineFromPost || pageTitle;

  const showPortraitVideoCarousel =
    portraitVideoItems && portraitVideoItems.portraitVideo.blocks.length > 0;

  return (
    <>
      <ATIAnalytics atiData={atiAnalytics} />
      <ChartbeatAnalytics title={metaTitle ?? pageTitle} />
      <MetadataContainer
        title={metaTitle}
        lang={lang}
        image={metaImage?.url}
        imageAltText={metaImage?.altText}
        imageWidth={metaImage?.width}
        imageHeight={metaImage?.height}
        description={pageDescription}
        openGraphType="website"
        hasAmpPage={false}
      />
      <LinkedDataContainer
        type="NewsArticle"
        seoTitle={metaTitle ?? pageTitle}
        headline={metaTitle ?? pageTitle}
        showAuthor
        promoImage={metaImage?.url}
        {...(datePublished && { datePublished })}
        {...(dateModified && { dateModified })}
        {...(liveBlogPostingSchema && { entities: [liveBlogPostingSchema] })}
      />
      <main>
        <Header
          showLiveLabel={
            showSportData && !!isSportDataLive ? isSportDataLive : isLive
          }
          title={showSportData && !!sportDataTitle ? sportDataTitle : title}
          description={description}
          imageUrl={imageUrl}
          imageUrlTemplate={imageUrlTemplate}
          imageWidth={imageWidth}
          mediaCollections={mediaCollections}
          showSportData={showSportData}
        />
        {showSportData && (
          <HeadToHeadV2
            data={sportData}
            isConciseView={false} // defaulted to false for developement/ MVP
            shouldShowActions={false} // defaulted to false for developement/ MVP
          />
        )}
        <div css={styles.outerGrid}>
          <div css={styles.firstSection}>
            {keyPoints && (
              <KeyPoints keyPointsContent={keyPoints.model.blocks} />
            )}
          </div>
          <div css={styles.secondSection}>
            {showPortraitVideoCarousel && (
              <PortraitVideoCarousel
                blocks={portraitVideoItems.portraitVideo.blocks}
                eventTrackingData={{
                  componentName: 'portrait-video-carousel-live',
                  groupTracker: { name: translations.media.watch },
                }}
              />
            )}
            <Stream
              streamData={currentStreamData}
              contributors={liveTextStream.contributors}
              setIsFirstPostVisible={setIsFirstPostVisible}
              streamRef={streamRef}
              applyPendingUpdate={applyPendingUpdate}
            />
            <LatestPostButton
              isFirstPostVisible={isFirstPostVisible}
              hasPendingUpdate={hasPendingUpdate}
              streamRef={streamRef as RefObject<HTMLDivElement>}
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
