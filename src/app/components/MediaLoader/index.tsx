import React, { useContext, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import Caption from '#app/legacy/containers/Caption';
import { RequestContext } from '#contexts/RequestContext';
import { MEDIA_PLAYER_STATUS } from '#app/lib/logger.const';
import { BumpType, AresMediaBlock, PlayerConfig } from './types';
import nodeLogger from '../../lib/logger.node';
import buildConfig from './utils/buildSettings';
import getCaptionBlock from './utils/getCaptionBlock';

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

const MediaContainer = ({ playerConfig }: { playerConfig: PlayerConfig }) => {
  const playerElementRef = useRef(null);

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
      logger.error(MEDIA_PLAYER_STATUS, error);
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

type Props = {
  className?: string;
  blocks: AresMediaBlock[];
};

const MediaLoader = ({ blocks, className }: Props) => {
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const { id, pageType, counterName } = useContext(RequestContext);

  const config = buildConfig({
    id,
    pageType,
    blocks,
    counterName,
  });

  if (config === null) return null;

  const { mediaType, playerConfig } = config;

  const captionBlock = getCaptionBlock(blocks, pageType);

  return (
    <div className={className}>
      <BumpLoader />
      {isPlaceholder ? (
        <Placeholder setter={setIsPlaceholder} />
      ) : (
        <MediaContainer playerConfig={playerConfig} />
      )}
      {captionBlock && <Caption block={captionBlock} type={mediaType} />}
    </div>
  );
};

export default MediaLoader;
