import { use, useEffect, useRef, useState } from 'react';
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
import {
  BumpType,
  EventMapping,
  MediaBlock,
  MediaPlayerEvents,
  PlayerConfig,
} from './types';
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
import Message from './Message';

const PAGETYPES_IGNORE_PLACEHOLDER: PageTypes[] = [
  MEDIA_ARTICLE_PAGE,
  MEDIA_ASSET_PAGE,
];

const logger = nodeLogger(__filename);

type BumpLoaderProps = {
  nonce?: string | null;
};

export const BumpLoader = ({ nonce }: BumpLoaderProps) => (
  <Helmet>
    <script
      type="text/javascript"
      {...(nonce ? { nonce } : {})}
      src="https://static.bbci.co.uk/frameworks/requirejs/0.13.0/sharedmodules/require.js"
    />
    <script type="text/javascript" {...(nonce ? { nonce } : {})}>
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
  uniqueId?: string;
  noJsMessage?: string;
  eventMapping?: EventMapping;
};

const isAudioPlayer = (playerConfig: PlayerConfig) =>
  playerConfig?.ui?.skin === 'audio';

const MediaContainer = ({
  playerConfig,
  showAds,
  uniqueId,
  noJsMessage,
  eventMapping,
}: MediaContainerProps) => {
  const playerElementRef = useRef<HTMLDivElement>(null);
  const isAudio = isAudioPlayer(playerConfig);

  useEffect(() => {
    try {
      window.requirejs(['bump-4'], (Bump: BumpType) => {
        if (playerElementRef?.current && playerConfig) {
          // The requirejs callback cannot be async, so we wrap async logic in an inner function and invoke it immediately.
          const initPlayer = async () => {
            const mediaPlayer = Bump.player(
              playerElementRef.current,
              playerConfig,
            );

            if (uniqueId != null) {
              const { mediaPlayers } = window;
              if (mediaPlayers == null) {
                window.mediaPlayers = { [uniqueId]: mediaPlayer };
              } else {
                mediaPlayers[uniqueId] = mediaPlayer;
              }
            }

            // Bind any events passed in to the player
            if (eventMapping && Object.keys(eventMapping || {}).length > 0) {
              Object.keys(eventMapping).forEach(bindingKey => {
                const key = bindingKey as MediaPlayerEvents;
                const handler = eventMapping[key];

                if (handler) mediaPlayer.bind(key, handler);
              });
            }

            if (showAds) {
              const adTag = await window.dotcom.ads.getAdTag();

              if (adTag) {
                mediaPlayer.loadPlugin(
                  {
                    swf: 'name:dfpAds.swf',
                    html: 'name:dfpAds.js',
                  },
                  {
                    name: 'AdsPluginParameters',
                    data: {
                      adTag,
                    },
                  },
                );
              }

              mediaPlayer.bind('playlistLoaded', async () => {
                const updatedAdTag = await window.dotcom.ads.getAdTag();

                if (updatedAdTag) {
                  mediaPlayer.dispatchEvent(
                    'bbc.smp.plugins.ads.event.updateAdTag',
                    {
                      adTag: updatedAdTag,
                    },
                  );
                }
              });
            }

            mediaPlayer.load();
          };

          initPlayer();
        }
      });
    } catch (error) {
      logger.error(MEDIA_PLAYER_STATUS, error);
    }
  }, [playerConfig, showAds, uniqueId, eventMapping]);

  return (
    <div
      ref={playerElementRef}
      data-e2e="media-player"
      className="media-player"
      css={isAudio ? styles.audioMediaContainer : styles.standardMediaContainer}
    >
      <noscript>
        <Message message={noJsMessage} />
      </noscript>
    </div>
  );
};

type Props = {
  blocks: MediaBlock[];
  className?: string;
  embedded?: boolean;
  uniqueId?: string;
  eventMapping?: EventMapping;
};

const MediaLoader = ({
  blocks,
  className,
  embedded,
  uniqueId,
  eventMapping,
}: Props) => {
  const { lang, service, translations } = use(ServiceContext);
  const { pageIdentifier } = use(EventTrackingContext);
  const { enabled: adsEnabled } = useToggle('preroll');

  const {
    id,
    pageType,
    statsDestination,
    isAmp,
    isLite,
    showAdsBasedOnLocation,
    nonce,
  } = use(RequestContext);

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
  const isPortrait = orientation === 'portrait';
  const isLandscape = orientation === 'landscape';
  const isAudio = isAudioPlayer(playerConfig);

  const {
    placeholderSrc,
    placeholderSrcset,
    translatedNoJSMessage,
    mediaInfo,
  } = placeholderConfig ?? {};

  const noJsMessage = translatedNoJSMessage || translations?.media?.noJs;

  const hasPlaceholder = Boolean(showPlaceholder && placeholderSrc);

  return (
    <>
      {
        // Prevents the av-embeds route itself rendering the Metadata component
        !embedded && (
          <Metadata blocks={blocks} embedURL={playerConfig?.externalEmbedUrl} />
        )
      }
      <figure
        data-e2e="media-loader__container"
        className={`media-container${className ? ` ${className}` : ''}`}
        css={[
          styles.figure(embedded),
          !isAudio && [
            isPortrait && styles.portraitFigure(embedded),
            isLandscape && styles.landscapeFigure,
          ],
        ]}
      >
        {isAmp ? (
          <AmpMediaLoader
            src={ampIframeUrl}
            title={mediaInfo?.title}
            placeholderSrc={placeholderSrc}
            placeholderSrcset={placeholderSrcset}
            noJsMessage={noJsMessage}
          />
        ) : (
          <>
            {showAds && <AdvertTagLoader />}
            <BumpLoader nonce={nonce} />
            {hasPlaceholder ? (
              <Placeholder
                src={placeholderSrc}
                srcSet={placeholderSrcset}
                noJsMessage={noJsMessage}
                mediaInfo={mediaInfo}
                onClick={() => setShowPlaceholder(false)}
                isPortraitOrientation={!!isPortrait}
              />
            ) : (
              <MediaContainer
                playerConfig={playerConfig}
                showAds={showAds}
                uniqueId={uniqueId}
                noJsMessage={noJsMessage}
                eventMapping={eventMapping}
              />
            )}
          </>
        )}
        {captionBlock && (
          <Caption
            className={isPortrait ? 'portrait-caption' : ''}
            block={captionBlock}
            type={mediaType}
            css={[
              isAudio && styles.captionAudio,
              !isAudio && [isPortrait && styles.captionPortrait],
            ]}
          />
        )}
      </figure>
    </>
  );
};

export default MediaLoader;
