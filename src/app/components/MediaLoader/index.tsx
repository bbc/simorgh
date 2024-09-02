/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { RequestContext } from '#contexts/RequestContext';
import { MEDIA_PLAYER_STATUS } from '#app/lib/logger.const';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useLocation from '#app/hooks/useLocation';
import useToggle from '#app/hooks/useToggle';
import { createRequire } from 'module';
import { BumpType, MediaBlock, PlayerConfig } from './types';
import Caption from '../Caption';
import nodeLogger from '../../lib/logger.node';
import buildConfig from './utils/buildSettings';
import Placeholder from './Placeholder';
import getProducerFromServiceName from './utils/getProducerFromServiceName';
import getCaptionBlock from './utils/getCaptionBlock';
import styles from './index.styles';
import { getBootstrapSrc } from '../Ad/Canonical';

createRequire(__dirname);

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

const MediaContainer = ({
  playerConfig,
  showAds,
}: {
  playerConfig: PlayerConfig;
  showAds: boolean;
}) => {
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
      css={styles.mediaContainer}
    />
  );
};

type Props = {
  className?: string;
  blocks: MediaBlock[];
};

const MediaLoader = ({ blocks, className }: Props) => {
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const { lang, translations } = useContext(ServiceContext);
  const { enabled: adsEnabled } = useToggle('ads');

  const {
    pageType,
    counterName,
    statsDestination,
    service,
    isAmp,
    isLite,
    showAdsBasedOnLocation,
  } = useContext(RequestContext);

  if (isLite) return null;

  const producer = getProducerFromServiceName(service);

  const config = buildConfig({
    blocks,
    counterName,
    statsDestination,
    producer,
    isAmp,
    lang,
    pageType,
    service,
    translations,
    adsEnabled,
    showAdsBasedOnLocation,
  });

  if (!config) return null;

  const { mediaType, playerConfig, placeholderConfig, showAds } = config;

  const {
    mediaInfo,
    placeholderSrc,
    placeholderSrcset,
    translatedNoJSMessage,
  } = placeholderConfig;

  const captionBlock = getCaptionBlock(blocks, pageType);

  return (
    <figure
      data-e2e="media-loader__container"
      css={styles.figure}
      className={className}
    >
      {showAds && <AdvertTagLoader />}
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
        <MediaContainer playerConfig={playerConfig} showAds={showAds} />
      )}
      {captionBlock && <Caption block={captionBlock} type={mediaType} />}
    </figure>
  );
};

export default MediaLoader;
