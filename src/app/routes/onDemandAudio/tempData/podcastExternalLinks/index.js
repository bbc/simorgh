import pathOr from 'ramda/src/pathOr';
import nodeLogger from '#lib/logger.node';
import { PODCAST_SERVICE_MISSING } from '#lib/logger.const';

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

const getRssLink = brandPid => ({
  linkUrl: `https://podcasts.files.bbci.co.uk/${brandPid}.rss`,
  linkText: 'RSS',
  linkType: 'rss',
});

// Burmese podcast experiment - remove hardcoded linkText when rolling out to other services
const getDownloadLink = versionId => ({
  linkUrl: `https://open.live.bbc.co.uk/mediaselector/6/redir/version/2.0/mediaset/audio-nondrm-download-low/proto/https/vpid/${versionId}.mp3`,
  linkText: `Download`,
  linkType: 'download',
});

export const getPodcastExternalLinks = async (
  service,
  brandPid,
  versionId,
  variant = 'default',
) => {
  try {
    const linkData = await podcastExternalLinks[service]();
    if (!linkData) return [];
    if (!brandPid) return [];

    const links = pathOr([], ['default', variant, brandPid], linkData);

    return [...links, getRssLink(brandPid), getDownloadLink(versionId)];
  } catch (err) {
    logger.warn(PODCAST_SERVICE_MISSING, {
      service,
      brandPid,
      variant,
    });
  }
  return [];
};

export default podcastExternalLinks;
