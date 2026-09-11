import { OnDemandAudioBlock } from '#app/models/types/media';

export type OnDemandAudioExternalLink = {
  linkText?: string;
  linkUrl?: string;
  linkType: string;
};

export type OnDemandAudioRecentEpisode = {
  id: string;
  episodeTitle?: string;
  brandTitle?: string;
  timestamp: number;
  duration: string;
};

interface GetOnDemandAudioLinkedDataProps {
  pathname: string;
  canonicalNonUkLink: string;
  serviceName?: string;
  isPodcast: boolean;
  mediaIsAvailable?: boolean;
  mediaBlocks?: OnDemandAudioBlock[];
  brandTitle: string;
  headline: string;
  episodeTitle?: string;
  summary: string;
  promoBrandTitle?: string | null;
  promoSeriesTitle?: string | null;
  brandShortSynopsis?: string;
  brandMediumSynopsis?: string;
  brandLongSynopsis?: string;
  thumbnailImageUrl: string;
  durationISO8601: string;
  releaseDateTimeStamp?: number;
  externalLinks?: OnDemandAudioExternalLink[];
  recentEpisodes?: OnDemandAudioRecentEpisode[];
}

const PODCAST_EPISODE_PATHNAME_REGEX =
  /\/podcasts\/(?!programmes\/)[^/]+\/[^/]+(?:\.lite)?$/;

const getOnDemandAudioLinkedData = ({
  pathname,
  canonicalNonUkLink,
  serviceName,
  isPodcast,
  mediaIsAvailable,
  mediaBlocks,
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
}: GetOnDemandAudioLinkedDataProps) => {
  const isPodcastEpisodePage = PODCAST_EPISODE_PATHNAME_REGEX.test(pathname);
  const shouldEmitPodcastEpisodeSchema = isPodcast && isPodcastEpisodePage;
  const isPodcastBrandPage = isPodcast && !isPodcastEpisodePage;

  const episodeCanonicalUrl = canonicalNonUkLink;
  const brandCanonicalUrl = isPodcastBrandPage
    ? canonicalNonUkLink
    : episodeCanonicalUrl.replace(/\/([^/]+)(?:\.lite)?$/, '');

  const brandEntityId = `${brandCanonicalUrl}#series`;
  const episodeId = `${episodeCanonicalUrl}#episode`;
  const audioId = `${episodeCanonicalUrl}#audio`;

  const availableFrom = mediaBlocks?.[0]?.model?.versions?.[0]?.availableFrom;
  const uploadDateSource = availableFrom ?? releaseDateTimeStamp;
  const uploadDate = uploadDateSource
    ? new Date(uploadDateSource).toISOString()
    : undefined;

  const datePublished = releaseDateTimeStamp
    ? new Date(releaseDateTimeStamp).toISOString()
    : undefined;

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
            datePublished,
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

  const podcastBrandHasPart = recentEpisodes?.map(episode => ({
    '@type': 'PodcastEpisode',
    '@id': `${brandCanonicalUrl}/${episode.id}#episode`,
    url: `${brandCanonicalUrl}/${episode.id}`,
    name: episode.episodeTitle || episode.brandTitle || brandTitle,
    datePublished: new Date(episode.timestamp).toISOString(),
    duration: episode.duration,
  }));

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

  const getMetadataTitle = () => {
    if (isPodcastBrandPage) return `${brandTitle} - ${serviceName}`;
    if (episodeTitle) return `${episodeTitle} - ${brandTitle} - ${serviceName}`;
    return headline;
  };

  const metadataTitle = getMetadataTitle();

  const metadataDescription = isPodcastBrandPage ? brandDescription : summary;

  const mainEntityId = (() => {
    if (isPodcastBrandPage) return brandEntityId;
    if (podcastEpisodeEntities) return episodeId;
    return undefined;
  })();

  return {
    isPodcastEpisodePage,
    isPodcastBrandPage,
    linkedDataEntities,
    mainEntityId,
    metadataTitle,
    metadataDescription,
    brandDescription,
  };
};

export default getOnDemandAudioLinkedData;
