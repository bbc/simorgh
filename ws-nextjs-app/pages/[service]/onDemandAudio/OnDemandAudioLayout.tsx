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

  const isPodcastEpisodePage =
    /\/podcasts\/(?!programmes\/)[^/]+\/[^/]+(?:\.lite)?$/.test(pathname);

  const shouldEmitPodcastEpisodeSchema = isPodcast && isPodcastEpisodePage;
  const isPodcastBrandPage = isPodcast && !isPodcastEpisodePage;

  const episodeCanonicalUrl = canonicalNonUkLink;
  const brandCanonicalUrl = isPodcastBrandPage
    ? canonicalNonUkLink
    : episodeCanonicalUrl.replace(/\/([^/]+)(?:\.lite)?$/, '');

  const brandEntityId = `${brandCanonicalUrl}#series`;
  const episodeId = `${episodeCanonicalUrl}#episode`;
  const audioId = `${episodeCanonicalUrl}#audio`;

  const versions = pageData.mediaBlocks?.[0]?.model?.versions ?? [];
  const availableFrom = versions[0]?.availableFrom;

  const uploadDate = availableFrom
    ? new Date(availableFrom).toISOString()
    : new Date(releaseDateTimeStamp).toISOString();

  const downloadLink = externalLinks?.find(
    link =>
      link.linkType === 'download' && link.linkUrl?.startsWith('https://'),
  );
  const rssLink = externalLinks?.find(link => link.linkType === 'rss');
  const podcastSeriesName = promoBrandTitle || promoSeriesTitle || brandTitle;

  const sameAs =
    externalLinks
      ?.filter(
        link =>
          Boolean(link.linkUrl) &&
          !['rss', 'download', 'form'].includes(link.linkType),
      )
      .map(link => link.linkUrl) ?? [];

  const audioEntities = !mediaIsAvailable
    ? []
    : [
        {
          '@type': 'AudioObject',
          name: promoBrandTitle || promoSeriesTitle,
          description: summary,
          thumbnailUrl: thumbnailImageUrl,
          duration: durationISO8601,
          uploadDate,
        },
      ];

  const podcastEpisodeEntities =
    shouldEmitPodcastEpisodeSchema && mediaIsAvailable
      ? [
          {
            '@type': 'PodcastSeries',
            '@id': brandEntityId,
            name: podcastSeriesName,
          },
          {
            '@type': 'PodcastEpisode',
            '@id': episodeId,
            name: episodeTitle,
            description: summary,
            datePublished: new Date(releaseDateTimeStamp).toISOString(),
            partOfSeries: { '@id': brandEntityId },
            associatedMedia: {
              '@type': 'AudioObject',
              '@id': audioId,
              name: episodeTitle,
              description: summary,
              ...(downloadLink?.linkUrl && {
                contentUrl: downloadLink.linkUrl,
                encodingFormat: 'audio/mpeg',
              }),
              duration: durationISO8601,
              thumbnailUrl: thumbnailImageUrl,
              uploadDate,
            },
          },
        ]
      : null;

  const podcastBrandHasPart = recentEpisodes?.map(
    (episode: {
      id: string;
      episodeTitle?: string;
      brandTitle?: string;
      timestamp: number;
      duration: string;
    }) => ({
      '@type': 'PodcastEpisode',
      '@id': `${brandCanonicalUrl}/${episode.id}#episode`,
      url: `${brandCanonicalUrl}/${episode.id}`,
      name: episode.episodeTitle || episode.brandTitle || brandTitle,
      datePublished: new Date(episode.timestamp).toISOString(),
      duration: episode.duration,
    }),
  );

  const brandDescription =
    brandLongSynopsis || brandMediumSynopsis || brandShortSynopsis || summary;

  const podcastBrandEntities = isPodcastBrandPage
    ? [
        {
          '@type': 'PodcastSeries',
          '@id': brandEntityId,
          name: podcastSeriesName,
          description: brandDescription,
          url: brandCanonicalUrl,
          image: {
            '@type': 'ImageObject',
            url: thumbnailImageUrl,
          },
          ...(rssLink?.linkUrl && { webFeed: rssLink.linkUrl }),
          ...(sameAs.length > 0 && { sameAs }),
          ...(podcastBrandHasPart &&
            podcastBrandHasPart.length > 0 && {
              hasPart: podcastBrandHasPart,
            }),
        },
      ]
    : null;

  const linkedDataEntities =
    podcastBrandEntities ?? podcastEpisodeEntities ?? audioEntities;

  const hasRecentEpisodes = recentEpisodes && Boolean(recentEpisodes.length);

  const getMetadataTitle = () => {
    if (isPodcastBrandPage) return `${brandTitle} - ${serviceName}`;
    if (episodeTitle) return `${episodeTitle} - ${brandTitle} - ${serviceName}`;
    return headline;
  };

  const metadataTitle = getMetadataTitle();

  const metadataDescription = isPodcastBrandPage ? brandDescription : summary;

  const mainEntityId = isPodcastBrandPage ? brandEntityId : episodeId;

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
