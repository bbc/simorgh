import React, { useContext, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { RequestContext } from '#contexts/RequestContext';
import { MEDIA_PLAYER_STATUS } from '#app/lib/logger.const';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { BumpType, PlayerConfig, MediaBlock } from './types';
import Caption from '../Caption';
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
  const playerElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      window.requirejs(['bump-4'], (Bump: BumpType) => {
        if (playerElementRef?.current && playerConfig) {
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
      data-e2e="media-loader__placeholder"
      onClick={() => setter(false)}
    >
      <time dateTime="PT34S">3:4</time>
      <svg width="100" height="100">
        <circle cx="50" cy="50" r="40" stroke="green" fill="yellow" />
      </svg>

      <img
        src="data:image/webp;base64,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"
        alt="HI"
      />
      <div>Contains strong language and some upsetting scenes.</div>
    </button>
  );
};

type Props = {
  className?: string;
  blocks: MediaBlock[];
};

const MediaLoader = ({ blocks, className }: Props) => {
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const { id, pageType, counterName, isAmp, service } =
    useContext(RequestContext);
  const { lang } = useContext(ServiceContext);

  const config = buildConfig({
    blocks,
    counterName,
    id,
    isAmp,
    lang,
    pageType,
    service,
  });

  if (!config) return null;

  const { mediaType, playerConfig } = config;

  const captionBlock = getCaptionBlock(blocks, pageType);

  return (
    <div className={className} data-e2e="media-loader__container">
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
