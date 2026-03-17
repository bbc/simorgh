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
import useToggle from '#app/hooks/useToggle';
import ContinueReadingButton from '#app/pages/ArticlePage/ContinueReadingButton';
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
  const { pathname, canonicalNonUkLink } = use(RequestContext);

  const { enabled: showPodcastEpisodeLinkedData } = useToggle(
    'podcastEpisodeLinkedData',
  );

  const isPodcastEpisodePage =
    /\/podcasts\/(?!programmes\/)[^/]+\/[^/]+(?:\.lite)?$/.test(pathname);

  const shouldEmitPodcastEpisodeSchema =
    isPodcast && isPodcastEpisodePage && showPodcastEpisodeLinkedData;

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

  const metadataImageProps = is(String, imageUrl)
    ? {
        image: `https://${imageUrl.replace('$recipe', `400x400`)}`,
        imageWidth: 400,
        imageHeight: 400,
      }
    : {};

  const [showAllContent, setShowAllContent] = useState(false);

  const shouldShowContinueReadingButton = isPodcast;

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
        description={shortSynopsis}
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
                  <FooterTimestamp
                    releaseDateTimeStamp={releaseDateTimeStamp}
                  />
                )}
                {mediaIsAvailable ? (
                  <MediaLoader blocks={pageData?.mediaBlocks} />
                ) : (
                  //  @ts-expect-error allow rendering of MediaError component when media is not available
                  <MediaError skin="audio" />
                )}
                <div
                  css={
                    showAllContent
                      ? styles.expandedSummary
                      : styles.collapsedSummary
                  }
                >
                  <OnDemandParagraphContainer testid="summary" text={summary} />
                </div>
                {shouldShowContinueReadingButton && (
                  <div css={styles.continueReadingWrapper}>
                    <ContinueReadingButton
                      className="continueReadingButtonOverride"
                      showAllContent={showAllContent}
                      setShowAllContent={setShowAllContent}
                    />
                  </div>
                )}
              </div>
              <EpisodeImage
                imageUrl={imageUrl}
                alt={imageAltText}
                css={styles.image}
                className="imageStyles"
              />
            </div>

            <LinkedData
              type="WebPage"
              seoTitle={metadataTitle}
              entities={linkedDataEntities}
              mainEntityId={shouldSetMainEntity ? episodeId : undefined}
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
