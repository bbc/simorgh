/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import Caption from '#app/legacy/containers/Caption';
import { RequestContext } from '#contexts/RequestContext';
import { MEDIA_PLAYER_STATUS } from '#app/lib/logger.const';
import { BumpType, PlayerConfig, Props } from './types';
import nodeLogger from '../../lib/logger.node';
import buildConfig from './utils/buildSettings';
import Placeholder from './Placeholder';

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

  const {
    mediaInfo,
    captionBlock,
    playerConfig,
    placeholderSrc,
    placeholderSrcset,
    translatedNoJSMessage,
  } = config;

  return (
    <div
      css={
        isPlaceholder && {
          position: 'relative',
          paddingTop: '56.25%',
          overflow: 'hidden',
        }
      }
    >
      <BumpLoader />
      {isPlaceholder ? (
        <Placeholder
          src={placeholderSrc}
          srcSet={placeholderSrcset}
          noJsMessage={translatedNoJSMessage}
          mediaInfo={mediaInfo}
          onClick={() => setIsPlaceholder(false)}
        />
      ) : (
        <MediaContainer playerConfig={playerConfig} />
      )}
      {captionBlock && <Caption block={captionBlock} type={mediaInfo.type} />}
    </div>
  );
};

export default MediaLoader;
