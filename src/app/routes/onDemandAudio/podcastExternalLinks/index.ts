import nodeLogger from '#lib/logger.node';
import { PODCAST_SERVICE_MISSING } from '#lib/logger.const';
import { PodcastExternalLinksParams, ExternalLinks } from './types';

const logger = nodeLogger(__filename);

const podcastExternalLinks = {
  arabic: () => import('./arabic'),
  burmese: () => import('./burmese'),
  gahuza: () => import('./gahuza'),
  hausa: () => import('./hausa'),
  hindi: () => import('./hindi'),
  indonesia: () => import('./indonesia'),
  kyrgyz: () => import('./kyrgyz'),
  marathi: () => import('./marathi'),
  nepali: () => import('./nepali'),
  persian: () => import('./persian'),
  portuguese: () => import('./portuguese'),
  russian: () => import('./russian'),
  ukrainian: () => import('./ukrainian'),
  urdu: () => import('./urdu'),
  zhongwen: () => import('./zhongwen'),
};

const getRssLink = (brandPid: string) => ({
  linkUrl: `https://podcasts.files.bbci.co.uk/${brandPid}.rss`,
  linkText: 'RSS',
  linkType: 'rss',
});

const getDownloadLink = (versionId: string) => ({
  linkUrl: `https://open.live.bbc.co.uk/mediaselector/6/redir/version/2.0/mediaset/audio-nondrm-download-low/proto/https/vpid/${versionId}.mp3`,
  linkText: `Download`,
  linkType: 'download',
});

export const getPodcastExternalLinks = async ({
  service,
  brandId,
  versionId,
  variant,
}: PodcastExternalLinksParams): Promise<ExternalLinks[]> => {
  try {
    // @ts-expect-error type Services can't be used to index type
    const { default: linkData } = await podcastExternalLinks[service]();
    if (!linkData) return [];
    if (!brandId) return [];

    const links =
      (variant ? linkData[variant][brandId] : linkData[brandId]) || [];

    return [...links, getRssLink(brandId), getDownloadLink(versionId)];
  } catch (err) {
    logger.warn(PODCAST_SERVICE_MISSING, {
      service,
      brandPid: brandId,
      variant,
    });
  }
  return [];
};

export default podcastExternalLinks;
