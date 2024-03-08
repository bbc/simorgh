import onClient from '#app/lib/utilities/onClient';
import { BuildConfigProps, PlayerConfig } from '../types';
import configForPageType from '../configs';

const isTestRequested = () => {
  if (onClient()) {
    const testLiterals = window.location.hostname.match(/localhost|test/g);
    const isTest = testLiterals && testLiterals.length > 0;

    const queryParams = new URLSearchParams(window.location.search);
    const isRenderEnvLive = queryParams.get('renderer_env') === 'live';

    return isTest && !isRenderEnvLive;
  }

  return false;
};

const buildSettings = ({
  id,
  blocks,
  pageType,
  counterName,
  isAmp,
  service,
  lang,
}: BuildConfigProps) => {
  if (id === null) return null;

  const basePlayerSettings = {
    product: 'news',
    superResponsive: true,
    enableToucan: true,
    appType: isAmp ? 'amp' : 'responsive',
    appName: service !== 'news' ? `news-${service}` : 'news',
    externalEmbedUrl: '', // TODO: Check requirements on this, will need added in future when media player has dedicated page for AMP support
    ui: {
      controls: { enabled: true },
      locale: { lang: lang || 'en' },
      subtitles: { enabled: true, defaultOn: true },
      fullscreen: { enabled: true },
    },
    ...(counterName && { counterName }),
    ...(isTestRequested() && { mediator: { host: 'open.test.bbc.co.uk' } }),
  };

  const config = configForPageType(pageType)?.({ blocks });

  if (!config) return null;

  const { mediaType, pagePlayerSettings } = config;

  const playerConfig: PlayerConfig = {
    // Base configuration that all media players should have
    ...basePlayerSettings,
    // Additional configuration that is specific to the page type
    ...pagePlayerSettings,
  };

  return { mediaType, playerConfig };
};

export default buildSettings;
