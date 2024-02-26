import React, { useContext, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import getPlayerProps from '#app/legacy/containers/MediaPlayer/helpers/propsInference';
import Caption from '#app/legacy/containers/Caption';
import { RequestContext } from '#contexts/RequestContext';
import { BumpType, PlayerConfig, Props } from './types.d';
import nodeLogger from '../../lib/logger.node';
import buildConfig from './utils/buildSettings';

const logger = nodeLogger(__filename);

const BumpLoader = () => (
  <Helmet>
    <script
      type="text/javascript"
      src="https://static.bbci.co.uk/frameworks/requirejs/0.13.0/sharedmodules/require.js"
    />
    <script type="text/javascript">
      {`bbcRequireMap = {
            "bump-4":"https://emp.bbci.co.uk/emp/bump-4/bump-4"
        }
        require({ paths: bbcRequireMap, waitSeconds: 30 });`}
    </script>
  </Helmet>
);

const VideoPlayer = ({ playerConfig }: { playerConfig: PlayerConfig }) => {
  const playerElementRef = useRef();

  useEffect(() => {
    try {
      window.requirejs(['bump-4'], (Bump: BumpType) => {
        if (playerElementRef && playerElementRef.current && playerConfig) {
          const mediaPlayer = Bump.player(
            playerElementRef.current,
            playerConfig,
          );
          mediaPlayer.load();
        }
      });
    } catch (error) {
      logger.error('Failed to bind SMP', error);
    }
  }, [playerConfig]);

  return <div ref={playerElementRef} data-e2e="media-player" />;
};

const Placeholder = ({ setter }: { setter: (value: boolean) => void }) => {
  return (
    <button
      type="button"
      data-e2e="media-player__placeholder"
      onClick={() => setter(false)}
    >
      TODO: CLICK TO SEE VIDEO
    </button>
  );
};

const Player = ({ blocks }: Props) => {
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const { id, pageType, counterName } = useContext(RequestContext);

  const { mediaInfo, captionBlock } = getPlayerProps({
    assetId: id,
    pageType,
    blocks,
  });

  const playerConfig = buildConfig({
    id,
    pageType,
    blocks,
    counterName,
  });

  if (playerConfig?.playlistObject == null) {
    return null;
  }

  return (
    <>
      <BumpLoader />
      {isPlaceholder ? (
        <Placeholder setter={setIsPlaceholder} />
      ) : (
        <VideoPlayer playerConfig={playerConfig} />
      )}
      {captionBlock && <Caption block={captionBlock} type={mediaInfo.type} />}
    </>
  );
};

export default Player;
