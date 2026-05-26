import { use, useState } from 'react';

import is from 'ramda/src/is';
import path from 'ramda/src/path';

import ATIAnalytics from '#app/components/ATIAnalytics';
import ChartbeatAnalytics from '#app/components/ChartbeatAnalytics';
import { ContentType } from '#app/components/ChartbeatAnalytics/types';
import ContinueReadingButton from '#app/components/ContinueReadingButton';
import LinkedData from '#app/components/LinkedData';
import MediaLoader from '#app/components/MediaLoader';
import MetadataContainer from '#app/components/Metadata';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import RecentAudioEpisodes from '#containers/EpisodeList/RecentAudioEpisodes';
import FooterTimestamp from '#containers/OnDemandFooterTimestamp';
import StyledRadioHeadingContainer from '#containers/OnDemandHeading/StyledRadioHeadingContainer';
import EpisodeImage from '#containers/OnDemandImage';
import OnDemandParagraphContainer from '#containers/OnDemandParagraph';
import PodcastExternalLinks from '#containers/PodcastExternalLinks';
import RadioScheduleContainer from '#containers/RadioSchedule';
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

  const isPodcastEpisodePage =
    /\/podcasts\/(?!programmes\/)[^/]+\/[^/]+(?:\.lite)?$/.test(pathname);

  const shouldEmitPodcastEpisodeSchema = isPodcast && isPodcastEpisodePage;

  const episodeCanonicalUrl = canonicalNonUkLink;
  const seriesCanonicalUrl = episodeCanonicalUrl.replace(
    /\/([^/]+)(?:\.lite)?$/,
    '',
  );

  const seriesId = `${seriesCanonicalUrl}#series`;
  const episodeId = `${episodeCanonicalUrl}#episode`;
  const audioId = `${episodeCanonicalUrl}#audio`;

  const versions = pageData.mediaBlocks?.[0]?.model?.versions ?? [];
  const availableFrom = versions[0]?.availableFrom;

  const uploadDate = availableFrom
    ? new Date(availableFrom).toISOString()
    : new Date(releaseDateTimeStamp).toISOString();

  const audioEntities = !mediaIsAvailable
    ? []
    : [
        {
          '@type': 'AudioObject',
          name: promoBrandTitle,
          description: summary,
          thumbnailUrl: thumbnailImageUrl,
          duration: durationISO8601,
          uploadDate,
        },
      ];

  const podcastEntities =
    shouldEmitPodcastEpisodeSchema && mediaIsAvailable
      ? [
          {
            '@type': 'PodcastSeries',
            '@id': seriesId,
            name: brandTitle,
          },
          {
            '@type': 'PodcastEpisode',
            '@id': episodeId,
            name: episodeTitle || brandTitle,
            description: summary,
            datePublished: new Date(releaseDateTimeStamp).toISOString(),
            partOfSeries: { '@id': seriesId },
            associatedMedia: {
              '@type': 'AudioObject',
              '@id': audioId,
              name: episodeTitle || promoBrandTitle,
              description: summary,
              duration: durationISO8601,
              thumbnailUrl: thumbnailImageUrl,
              uploadDate,
            },
          },
        ]
      : null;

  const linkedDataEntities = podcastEntities ?? audioEntities;

  const hasRecentEpisodes = recentEpisodes && Boolean(recentEpisodes.length);
  const metadataTitle = episodeTitle
    ? `${episodeTitle} - ${brandTitle} - ${serviceName}`
    : headline;

  const shouldSetMainEntity = Boolean(podcastEntities);

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
      <ATIAnalytics atiData={pageData?.metadata?.atiAnalytics ?? undefined} />
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
        description={summary}
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
              entities={linkedDataEntities}
              mainEntityId={shouldSetMainEntity ? episodeId : undefined}
              {...(isPodcastEpisodePage &&
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
