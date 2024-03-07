import onClient from '#app/lib/utilities/onClient';
import { BuildConfigProps, PlayerConfig } from '../types';
import selectConfig from '../configs';

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

const buildConfig = ({
  id,
  blocks,
  pageType,
  counterName,
  translations,
}: BuildConfigProps) => {
  if (id === null) return null;

  const basePlayerConfig = {
    product: 'news',
    superResponsive: true,
    enableToucan: true,
    ...(counterName && { counterName }),
    ...(isTestRequested() && { mediator: { host: 'open.test.bbc.co.uk' } }),
  };

  const configBuilder = selectConfig(pageType);

  const pageConfig = configBuilder({
    blocks,
    translations,
  });

  if (pageConfig === null) {
    return null;
  }

  const {
    clipId,
    guidanceMessage,
    kind,
    mediaType,
    placeholderSrc,
    rawDuration,
    title,
  } = pageConfig;

  const playerConfig: PlayerConfig = {
    ...basePlayerConfig,
    playlistObject: {
      title,
      holdingImageURL: placeholderSrc,
      items: [
        {
          versionID: clipId,
          kind,
          duration: rawDuration,
        },
      ],
      ...(guidanceMessage && { guidance: guidanceMessage }),
    },
  };

  return { mediaType, playerConfig };
};

export default buildConfig;
