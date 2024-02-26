import getPlayerProps from '#app/legacy/containers/MediaPlayer/helpers/propsInference';
import onClient from '#app/lib/utilities/onClient';
import { BuildConfigProps } from '../types.d';

const isTestURL = () => {
  let isTestRender = false;

  if (onClient()) {
    const search = new URLSearchParams(window.location.search);
    isTestRender = search.get('renderer_env') === 'test';
  }

  return isTestRender;
};

const buildConfig = ({
  id,
  blocks,
  pageType,
  counterName,
}: BuildConfigProps) => {
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

  const playlistItem = { versionID: clipId, kind, duration: rawDuration };

  return {
    product: 'news',
    superResponsive: true,
    ...(counterName && { counterName }),
    ...(isTestURL() && { mediator: { host: 'open.test.bbc.co.uk' } }),
    playlistObject: {
      title,
      holdingImageURL: placeholderSrc,
      items: [playlistItem],
      ...(guidanceMessage && { guidance: guidanceMessage }),
    },
  };
};

export default buildConfig;
