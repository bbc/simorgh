import nodeLogger from '#lib/logger.node';
import { PODCAST_SERVICE_MISSING } from '#lib/logger.const';
import { PodcastExternalLinksParams, ExternalLinks } from './types';

const logger = nodeLogger(__filename);

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

export default async ({
  service,
  variant,
  brandId,
  versionId,
}: PodcastExternalLinksParams): Promise<ExternalLinks[]> => {
  try {
    const { default: externalLinks } = await import(`./${service}`);
    if (!externalLinks) return [];
    if (!brandId) return [];

    const links =
      (variant ? externalLinks[variant][brandId] : externalLinks[brandId]) ||
      [];

    return [...links, getRssLink(brandId), getDownloadLink(versionId)];
  } catch (err) {
    logger.warn(PODCAST_SERVICE_MISSING, {
      service,
      brandId,
      variant,
    });
  }
  return [];
};
