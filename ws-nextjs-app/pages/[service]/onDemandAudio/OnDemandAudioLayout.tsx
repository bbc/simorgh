import { use, useState } from 'react';
import path from 'ramda/src/path';
import is from 'ramda/src/is';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import StyledRadioHeadingContainer from '#containers/OnDemandHeading/StyledRadioHeadingContainer';
import OnDemandParagraphContainer from '#containers/OnDemandParagraph';
import EpisodeImage from '#containers/OnDemandImage';
import RadioScheduleContainer from '#containers/RadioSchedule';
import RecentAudioEpisodes from '#containers/EpisodeList/RecentAudioEpisodes';
import FooterTimestamp from '#containers/OnDemandFooterTimestamp';
import PodcastExternalLinks from '#containers/PodcastExternalLinks';
import MediaLoader from '#app/components/MediaLoader';
import ATIAnalytics from '#app/components/ATIAnalytics';
import ChartbeatAnalytics from '#app/components/ChartbeatAnalytics';
import MetadataContainer from '#app/components/Metadata';
import LinkedData from '#app/components/LinkedData';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import { ContentType } from '#app/components/ChartbeatAnalytics/types';
import ContinueReadingButton from '#app/components/ContinueReadingButton';
import getOnDemandAudioLinkedData from './getOnDemandAudioLinkedData';
import styles from './index.styles';
import { OnDemandAudioProps } from './types';

const SKIP_LINK_ANCHOR_ID = 'content';

const OnDemandAudioPage = ({
  pageData,
  mediaIsAvailable,
  MediaError,
}: OnDemandAudioProps) => {
  const idAttr = SKIP_LINK_ANCHOR_ID;
  const {
    isPodcast,
    language,
    brandTitle,
    headline,
    summary,
    shortSynopsis,
    masterBrand,
    releaseDateTimeStamp,
    imageUrl,
    imageAltText,
    promoBrandTitle,
    promoSeriesTitle,
    brandShortSynopsis,
    brandMediumSynopsis,
    brandLongSynopsis,
    durationISO8601,
    thumbnailImageUrl,
    radioScheduleData,
    recentEpisodes,
    brandId,
    episodeTitle,
    externalLinks,
  } = pageData;

  const pageType = path(['metadata', 'type'], pageData);

  const { serviceName } = use(ServiceContext);
  const { isLite, pathname, canonicalNonUkLink } = use(RequestContext);

  const {
    isPodcastEpisodePage,
    isPodcastBrandPage,
    linkedDataEntities,
    mainEntityId,
    metadataTitle,
    metadataDescription,
    brandDescription,
  } = getOnDemandAudioLinkedData({
    pathname,
    canonicalNonUkLink,
    serviceName,
    isPodcast,
    mediaIsAvailable,
    mediaBlocks: pageData.mediaBlocks,
    brandTitle,
    headline,
    episodeTitle,
    summary,
    promoBrandTitle,
    promoSeriesTitle,
    brandShortSynopsis,
    brandMediumSynopsis,
    brandLongSynopsis,
    thumbnailImageUrl,
    durationISO8601,
    releaseDateTimeStamp,
    externalLinks,
    recentEpisodes,
  });

  const hasRecentEpisodes = recentEpisodes && Boolean(recentEpisodes.length);

  const imageHeight = isPodcastEpisodePage ? 675 : 400;
  const imageWidth = isPodcastEpisodePage ? 1200 : 400;
  const image = `https://${imageUrl?.replace('$recipe', `${imageWidth}x${imageHeight}`)}`;
  const metadataImageProps = is(String, imageUrl)
    ? {
        image,
        imageWidth,
        imageHeight,
      }
    : {};

  const [showAllContent, setShowAllContent] = useState(false);

  const summaryIsShort = Boolean(summary === shortSynopsis);

  const shouldShowContinueReadingButton =
    isPodcast && !isLite && !summaryIsShort;

  const summaryStyles =
    shouldShowContinueReadingButton && !showAllContent
      ? styles.collapsedSummary
      : styles.expandedSummary;

  return (
    <>
      <ATIAnalytics />
      <ChartbeatAnalytics
        mediaPageType={isPodcast ? 'Podcasts' : 'Radio'}
        title={headline}
        contentType={
          pageData?.metadata?.atiAnalytics?.contentType as ContentType
        }
      />
      <ComscoreAnalytics />
      <MetadataContainer
        openGraphType="website"
        lang={language}
        title={metadataTitle}
        description={metadataDescription}
        {...metadataImageProps}
        hasAmpPage={false}
      />
      <div css={styles.grid}>
        <div css={styles.contentWrapper}>
          <main role="main">
            <div css={styles.flexWrapper}>
              <div css={styles.text}>
                <StyledRadioHeadingContainer
                  idAttr={idAttr}
                  brandTitle={brandTitle}
                  episodeTitle={episodeTitle}
                  releaseDateTimeStamp={releaseDateTimeStamp}
                />
                {episodeTitle && (
                  <div css={styles.footerTimeStampWrapper}>
                    <FooterTimestamp
                      releaseDateTimeStamp={releaseDateTimeStamp}
                    />
                  </div>
                )}
                {mediaIsAvailable ? (
                  <MediaLoader blocks={pageData?.mediaBlocks} />
                ) : (
                  //  @ts-expect-error allow rendering of MediaError component when media is not available
                  <MediaError skin="audio" />
                )}
              </div>
              <EpisodeImage
                imageUrl={imageUrl}
                alt={imageAltText}
                css={styles.image}
                className="imageStyles"
                isPodcastEpisodePage
              />
            </div>
            <div css={summaryStyles}>
              <OnDemandParagraphContainer testid="summary" text={summary} />
            </div>
            {shouldShowContinueReadingButton && (
              <ContinueReadingButton
                css={styles.continueReadingButton}
                showAllContent={showAllContent}
                setShowAllContent={setShowAllContent}
              />
            )}

            <LinkedData
              type="WebPage"
              seoTitle={metadataTitle}
              description={isPodcastBrandPage ? brandDescription : undefined}
              entities={linkedDataEntities}
              mainEntityId={mainEntityId}
              {...(!isPodcastBrandPage &&
                isPodcastEpisodePage &&
                metadataImageProps && {
                  metadataImageProps,
                })}
            />
          </main>

          {isPodcast && (
            <div css={styles.aside}>
              <PodcastExternalLinks
                links={externalLinks}
                brandTitle={brandTitle}
              />
            </div>
          )}
          {hasRecentEpisodes && (
            <div css={styles.aside}>
              <RecentAudioEpisodes
                masterBrand={masterBrand}
                episodes={recentEpisodes}
                brandId={brandId}
                pageType={pageType}
              />
            </div>
          )}
        </div>
      </div>
      {radioScheduleData && (
        <RadioScheduleContainer
          initialData={radioScheduleData}
          toggleName="onDemandRadioSchedule"
          eventTrackingData={{ componentName: 'radio-schedule' }}
        />
      )}
    </>
  );
};

export default OnDemandAudioPage;
