/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { BumpType, Props } from './types.d';
import nodeLogger from '../../lib/logger.node';
import buildConfig from './utils/buildSettings';

const logger = nodeLogger(__filename);

const useLoadBump = ({ id, pageType, isAmp, blocks, counterName }: Props) => {
  const playerElementRef = useRef();
  const playerConfig = buildConfig({
    id,
    pageType,
    isAmp,
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
      logger.error('Failed to bind SMP');
    }
  }, [playerConfig]);

  return playerElementRef;
};

const Player = ({ id, pageType, isAmp, blocks, counterName }: Props) => {
  const playerElementRef = useLoadBump({
    id,
    pageType,
    isAmp,
    blocks,
    counterName,
  });

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
