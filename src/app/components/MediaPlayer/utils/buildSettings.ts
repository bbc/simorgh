import getPlayerProps from '#app/legacy/containers/MediaPlayer/helpers/propsInference';
import onClient from '#app/lib/utilities/onClient';
import { Props } from '../types.d';

const isTestURL = () => {
  let isTestRender = false;

  if (onClient()) {
    const search = new URLSearchParams(window.location.search);
    isTestRender =
      process.env.NODE_ENV !== 'production' &&
      search.get('renderer_env') === 'test';
  }

  return isTestRender;
};

const buildConfig = ({ id, blocks, pageType, counterName }: Props) => {
  const playerProps = getPlayerProps({
    assetId: id,
    pageType,
    blocks,
  });

  if (playerProps.mediaBlock === null) {
    return null;
  }

  const {
    clipId,
    mediaInfo: { title, rawDuration, guidanceMessage, kind },
    placeholderSrc,
  } = playerProps;

  const isTest = isTestURL();

  const playlistItem = { versionID: clipId, kind, duration: rawDuration };

  return {
    product: 'news',
    superResponsive: true as const,
    ...(counterName && { counterName }),
    ...(isTest && { mediator: { host: 'open.test.bbc.co.uk' } }),
    playlistObject: {
      title,
      holdingImageURL: placeholderSrc,
      items: [playlistItem],
      ...(guidanceMessage && { guidance: guidanceMessage }),
    },
  };
};

export default buildConfig;
