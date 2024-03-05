import getPlayerProps from '#app/legacy/containers/MediaPlayer/helpers/propsInference';
import onClient from '#app/lib/utilities/onClient';
import { BuildConfigProps } from '../types';

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
}: BuildConfigProps) => {
  if (id === null) return null;

  const playerProps = getPlayerProps({
    assetId: id,
    pageType,
    blocks,
  });

  const { mediaInfo, captionBlock } = playerProps;

  if (playerProps.mediaBlock === null) {
    return null;
  }

  const {
    clipId,
    mediaInfo: { title, rawDuration, guidanceMessage, kind },
    placeholderSrc,
  } = playerProps;

  const playlistItem = { versionID: clipId, kind, duration: rawDuration };

  const playerConfig = {
    product: 'news',
    superResponsive: true,
    ...(counterName && { counterName }),
    ...(isTestRequested() && { mediator: { host: 'open.test.bbc.co.uk' } }),
    playlistObject: {
      title,
      holdingImageURL: placeholderSrc,
      items: [playlistItem],
      ...(guidanceMessage && { guidance: guidanceMessage }),
    },
  };

  return { mediaInfo, captionBlock, playerConfig };
};

export default buildConfig;
