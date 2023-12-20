import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { BumpType, PlayerConfig, PropTypes } from './types';
import nodeLogger from '../../lib/logger.node';

const logger = nodeLogger(__filename);

const useLoadBump = (playerConfig: PlayerConfig) => {
  const playerElementRef = useRef();

  useEffect(() => {
    try {
      window.requirejs(['bump-4'], (Bump: BumpType) => {
        if (playerElementRef && playerElementRef.current) {
          const mediaPlayer = Bump.player(
            playerElementRef.current,
            playerConfig,
          );
          mediaPlayer.load();
        }
      });
    } catch (error) {
      logger.error('Failed to bind SMP');
    }
  }, [playerConfig]);

  return playerElementRef;
};

const Player = ({ holdingImageURL, title, pid }: PropTypes) => {
  const playerConfig = {
    product: 'news',
    superResponsive: true,
    counterName: 'smp.demopage.player.page',
    playlistObject: {
      title,
      holdingImageURL,
      items: [
        {
          versionID: 'p049sq7k',
          kind: 'programme',
          duration: 37,
        },
      ],
    },
    statsObject: { clipPID: pid },
  };

  const playerElementRef = useLoadBump(playerConfig);

  return (
    <>
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
      <div ref={playerElementRef} />
    </>
  );
};

export default Player;
