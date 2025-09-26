import onClient from '#app/lib/utilities/onClient';
import isLive from '#app/lib/utilities/isLive';
import filterForBlockType from '#app/lib/utilities/blockHandlers';
import { BuildConfigProps, PlayerConfig } from '../types';
import configForMediaBlockType from '../configs';

const isTestRequested = () => {
  if (isLive()) {
    return false;
  }

  if (onClient()) {
    const testLiterals = window.location.hostname.match(/localhost|test/g);
    const isTest = testLiterals && testLiterals.length > 0;

    const queryParams = new URLSearchParams(window.location.search);
    const isRenderEnvTest = queryParams.get('renderer_env') === 'test';

    return isTest && isRenderEnvTest;
  }

  return false;
};

const buildSettings = ({
  id,
  blocks,
  counterName,
  statsDestination,
  producer,
  isAmp,
  lang,
  pageType,
  service,
  translations,
  adsEnabled = false,
  showAdsBasedOnLocation = false,
  embedded,
}: BuildConfigProps) => {
  const { model: mediaOverrides } =
    filterForBlockType(blocks, 'mediaOverrides') || {};

  // Base configuration that all media players should have
  const basePlayerConfig: PlayerConfig = {
    autoplay: true,
    product: 'news',
    enableToucan: true,
    appType: isAmp ? 'amp' : 'responsive',
    appName: service !== 'news' ? `news-${service}` : 'news',
    ui: {
      skin: 'classic',
      controls: { enabled: true },
      locale: { lang: mediaOverrides?.language || lang || 'en' },
      subtitles: { enabled: true, defaultOn: true },
      fullscreen: { enabled: true },
    },
    ...(!embedded && { superResponsive: true }),
    ...(counterName && { counterName }),
    ...(isTestRequested() && { mediator: { host: 'open.test.bbc.co.uk' } }),
    statsObject: {
      destination: statsDestination,
      producer,
    },
  };

  // Augment base configuration with settings that are specific to the media type
  const config = configForMediaBlockType(blocks)?.({
    id,
    basePlayerConfig,
    blocks,
    pageType,
    translations,
    adsEnabled,
    showAdsBasedOnLocation,
    embedded,
    lang,
  });

  if (!config) return null;

  return config;
};

export default buildSettings;
