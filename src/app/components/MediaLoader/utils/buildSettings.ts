import onClient from '#app/lib/utilities/onClient';
import { BasePlayerConfig, BuildConfigProps } from '../types';
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

  // Base configuration that all media players should have
  const basePlayerConfig: BasePlayerConfig = {
    autoplay: true,
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

  // Additional configuration that is specific to the page type
  const config = configForPageType(pageType)?.({
    pageType,
    blocks,
    basePlayerConfig,
  });

  if (!config) return null;

  return config;
};

export default buildSettings;
