/** @jsx jsx */
/* @jsxFrag React.Fragment */

import { jsx } from '@emotion/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { RequestContext } from '#contexts/RequestContext';
import { MEDIA_PLAYER_STATUS } from '#app/lib/logger.const';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useLocation from '#app/hooks/useLocation';
import useToggle from '#app/hooks/useToggle';
import {
  MEDIA_ARTICLE_PAGE,
  MEDIA_ASSET_PAGE,
} from '#app/routes/utils/pageTypes';
import filterForBlockType from '#lib/utilities/blockHandlers';
import { PageTypes } from '#app/models/types/global';
import { EventTrackingContext } from '#app/contexts/EventTrackingContext';
import { BumpType, MediaBlock, PlayerConfig } from './types';
import Caption from '../Caption';
import nodeLogger from '../../lib/logger.node';
import buildConfig from './utils/buildSettings';
import Placeholder from './Placeholder';
import getProducerFromServiceName from './utils/getProducerFromServiceName';
import getCaptionBlock from './utils/getCaptionBlock';
import styles from './index.styles';
import { getBootstrapSrc } from '../Ad/Canonical';
import Metadata from './Metadata';
import AmpMediaLoader from './Amp';

const PAGETYPES_IGNORE_PLACEHOLDER: PageTypes[] = [
  MEDIA_ARTICLE_PAGE,
  MEDIA_ASSET_PAGE,
];

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

const AdvertTagLoader = () => {
  const location = useLocation();
  const queryString = location ? location.search : '';

  useEffect(() => {
    // Set window.dotcom to disabled if it doesn't load in 2 seconds.
    const timeoutID = setTimeout(() => {
      if (window.dotcom.ads.resolves) {
        window.dotcom.ads.resolves.enabled.forEach(res => res(false));
        window.dotcom.ads.resolves.getAdTag.forEach(res => res(''));
      }
    }, 2000);

    // Initialise the ads object if it hasn't already been loaded.
    window.dotcom = window.dotcom || { cmd: [] };
    window.dotcom.ads = window.dotcom.ads || {
      resolves: {
        enabled: [],
        getAdTag: [],
      },
      enabled() {
        return new Promise(resolve => {
          window.dotcom.ads.resolves.enabled.push(resolve);
        });
      },
      getAdTag() {
        return new Promise(resolve => {
          window.dotcom.ads.resolves.getAdTag.push(resolve);
        });
      },
    };

    return () => clearTimeout(timeoutID);
  }, [queryString]);

  return (
    <Helmet>
      <script type="module" src={getBootstrapSrc(queryString)} async />
      <script noModule src={getBootstrapSrc(queryString, true)} async />
    </Helmet>
  );
};

type MediaContainerProps = {
  playerConfig: PlayerConfig;
  showAds: boolean;
};

const MediaContainer = ({ playerConfig, showAds }: MediaContainerProps) => {
  const playerElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      window.requirejs(['bump-4'], async (Bump: BumpType) => {
        if (playerElementRef?.current && playerConfig) {
          const mediaPlayer = Bump.player(
            playerElementRef.current,
            playerConfig,
          );

          mediaPlayer.load();

          if (showAds) {
            const adTag = await window.dotcom.ads.getAdTag();
            mediaPlayer.loadPlugin(
              {
                swf: 'name:dfpAds.swf',
                html: 'name:dfpAds.js',
              },
              {
                name: 'AdsPluginParameters',
                data: {
                  adTag,
                  debug: true,
                },
              },
            );

            mediaPlayer.bind('playlistLoaded', async () => {
              const updatedAdTag = await window.dotcom.ads.getAdTag();
              mediaPlayer.dispatchEvent(
                'bbc.smp.plugins.ads.event.updateAdTag',
                {
                  updatedAdTag,
                },
              );
            });
          }
        }
      });
    } catch (error) {
      logger.error(MEDIA_PLAYER_STATUS, error);
    }
  }, [playerConfig, showAds]);

  return (
    <div
      ref={playerElementRef}
      data-e2e="media-player"
      css={
        playerConfig?.ui?.skin === 'audio'
          ? styles.audioMediaContainer
          : styles.standardMediaContainer
      }
    />
  );
};

type Props = {
  blocks: MediaBlock[];
  className?: string;
  embedded?: boolean;
};

const MediaLoader = ({ blocks, className, embedded }: Props) => {
  const { lang, translations } = useContext(ServiceContext);
  const { pageIdentifier } = useContext(EventTrackingContext);
  const { enabled: adsEnabled } = useToggle('ads');

  const {
    id,
    pageType,
    statsDestination,
    service,
    isAmp,
    isLite,
    showAdsBasedOnLocation,
  } = useContext(RequestContext);

  const [showPlaceholder, setShowPlaceholder] = useState(
    !PAGETYPES_IGNORE_PLACEHOLDER.includes(pageType),
  );

  if (isLite) return null;

  const { model: mediaOverrides } =
    filterForBlockType(blocks, 'mediaOverrides') || {};

  const producer = getProducerFromServiceName(service);
  const config = buildConfig({
    id: id || '',
    blocks,
    counterName: mediaOverrides?.pageIdentifierOverride || pageIdentifier,
    statsDestination,
    producer,
    isAmp,
    lang,
    pageType,
    service,
    translations,
    adsEnabled,
    showAdsBasedOnLocation,
    embedded,
  });

  if (!config) return null;

  const {
    mediaType,
    playerConfig,
    placeholderConfig,
    showAds,
    orientation = 'landscape',
    ampIframeUrl,
  } = config;

  const captionBlock = getCaptionBlock(blocks, pageType);

  const {
    placeholderSrc,
    placeholderSrcset,
    translatedNoJSMessage,
    mediaInfo,
  } = placeholderConfig ?? {};

  const hasPlaceholder = Boolean(showPlaceholder && placeholderSrc);

  const showPortraitTitle = orientation === 'portrait' && !embedded;

  return (
    <>
      {
        // Prevents the av-embeds route itself rendering the Metadata component
        !embedded && (
          <Metadata blocks={blocks} embedURL={playerConfig?.externalEmbedUrl} />
        )
      }
      {showPortraitTitle && (
        <strong css={styles.titlePortrait}>Watch Moments</strong>
      )}
      <figure
        data-e2e="media-loader__container"
        className={className}
        css={[
          styles.figure(embedded),
          playerConfig?.ui?.skin === 'classic' && [
            orientation === 'portrait' && styles.portraitFigure(embedded),
            orientation === 'landscape' && styles.landscapeFigure,
          ],
          playerConfig?.ui?.skin === 'audio' && styles.audioFigure,
        ]}
      >
        {isAmp ? (
          <AmpMediaLoader
            src={ampIframeUrl}
            title={mediaInfo?.title}
            placeholderSrc={placeholderSrc}
            placeholderSrcset={placeholderSrcset}
            noJsMessage={translatedNoJSMessage}
          />
        ) : (
          <>
            {showAds && <AdvertTagLoader />}
            <BumpLoader />
            {hasPlaceholder ? (
              <Placeholder
                src={placeholderSrc}
                srcSet={placeholderSrcset}
                noJsMessage={translatedNoJSMessage}
                mediaInfo={mediaInfo}
                onClick={() => setShowPlaceholder(false)}
              />
            ) : (
              <MediaContainer playerConfig={playerConfig} showAds={showAds} />
            )}
          </>
        )}
        {captionBlock && (
          <Caption
            block={captionBlock}
            type={mediaType}
            css={[
              styles.figure(embedded),
              playerConfig?.ui?.skin === 'classic' && [
                orientation === 'portrait' && styles.captionPortrait,
              ],
              playerConfig?.ui?.skin === 'audio' && styles.captionAudio,
            ]}
          />
        )}
      </figure>
    </>
  );
};

export default MediaLoader;
