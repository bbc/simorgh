import pathOr from 'ramda/src/pathOr';

import nodeLogger from '#lib/logger.node';
import { PODCAST_SERVICE_MISSING } from '#lib/logger.const';

const logger = nodeLogger(__filename);

const podcastExternalLinks = {
  arabic: () => import('./arabic.js'),
  burmese: () => import('./burmese.js'),
  gahuza: () => import('./gahuza.js'),
  hausa: () => import('./hausa.js'),
  hindi: () => import('./hindi.js'),
  indonesia: () => import('./indonesia.js'),
  marathi: () => import('./marathi.js'),
  nepali: () => import('./nepali.js'),
  persian: () => import('./persian.js'),
  portuguese: () => import('./portuguese.js'),
  russian: () => import('./russian.js'),
  zhongwen: () => import('./zhongwen.js'),
};

const getRssLink = brandPid => ({
  linkUrl: `http://podcasts.files.bbci.co.uk/${brandPid}.rss`,
  linkText: 'RSS',
});

export const getPodcastExternalLinks = async (
  service,
  brandPid,
  variant = 'default',
) => {
  try {
    const linkData = await podcastExternalLinks[service]();
    if (!linkData) return [];

    const links = pathOr([], ['default', variant, brandPid], linkData);
    return brandPid ? [...links, getRssLink(brandPid)] : [];
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
