/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { BumpType, PlayerConfig, PropTypes } from './types.d';
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
          // @ts-ignore
          mediaPlayer.bind('error', function (e) {
            console.log('ERROR', e);
          });
        }
      });
    } catch (error) {
      logger.error('Failed to bind SMP');
    }
  }, [playerConfig]);

  return playerElementRef;
};

type Block = {
  type: string;
  model: {
    locator?: string;
    text?: string;
    title?: string;
    blocks?: Block[];
    versions: unknown[];
    smpKind?: string;
  };
};

const Player = ({ blocks }: { blocks: Block[] }) => {
  const aresMedia = blocks.filter(
    (block: Block) => block.type === 'aresMedia',
  )[0];
  const aresMediaMetaData = aresMedia.model.blocks?.filter(
    (block: Block) => block.type === 'aresMediaMetadata',
  )[0];
  const imageData = aresMedia.model.blocks?.filter(
    (block: Block) => block.type === 'image',
  )[0];

  const title = aresMediaMetaData?.model.title;
  const {versionId,} = aresMediaMetaData?.model.versions[0];
  const kind = aresMediaMetaData?.model.smpKind;

  const holdingImageURL = imageData?.model.blocks?.filter(
    (block: Block) => block.type === 'rawImage',
  )[0]?.model.locator;
  const holdingImageAltText = imageData?.model.blocks?.filter(
    (block: Block) => block.type === 'altText',
  )[0]?.model.blocks?.[0].model.blocks?.[0].model.text;

  console.log('PROPS', title, versionData);
  // const playerConfig = {
  //   product: 'news',
  //   superResponsive: true as const,
  //   counterName: 'smp.demopage.player.page',
  //   playlistObject: {
  //     title,
  //     holdingImageURL,
  //     items: [
  //       {
  //         versionID,
  //         kind: 'programme',
  //         duration: 37,
  //       },
  //     ],
  //   },
  // };

  //const playerElementRef = useLoadBump(playerConfig);

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
