/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BumpType, Props } from './types.d';
import nodeLogger from '../../lib/logger.node';
import buildConfig from './utils/buildSettings';
import Caption from '#app/legacy/containers/Caption';
import getPlayerProps from '#app/legacy/containers/MediaPlayer/helpers/propsInference';

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

const VideoPlayer = ({ id, pageType, blocks, counterName }: Props) => {
  const playerElementRef = useRef();
  const playerConfig = buildConfig({
    id,
    pageType,
    blocks,
    counterName,
  });

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
    <button type="button" onClick={() => setter(false)}>
      TODO: CLICK TO SEE VIDEO
    </button>
  );
};

const Player = ({ id, pageType, blocks, counterName }: Props) => {
  const [isPlaceholder, setIsPlaceholder] = useState(true);

  const { mediaInfo, captionBlock } = getPlayerProps({
    assetId: id,
    pageType,
    blocks,
  });

  return (
    <>
      <BumpLoader />
      {isPlaceholder ? (
        <Placeholder setter={setIsPlaceholder} />
      ) : (
        <VideoPlayer
          id={id}
          pageType={pageType}
          blocks={blocks}
          counterName={counterName}
        />
      )}
      {captionBlock && <Caption block={captionBlock} type={mediaInfo.type} />}
    </>
  );
};

export default Player;
