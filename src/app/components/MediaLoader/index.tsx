import { use, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Helmet } from 'react-helmet';
import { RequestContext } from '#contexts/RequestContext';
import { MEDIA_PLAYER_STATUS } from '#app/lib/logger.const';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useLocation from '#app/hooks/useLocation';
import useToggle from '#app/hooks/useToggle';
import {
  LIVE_PAGE,
  MEDIA_ARTICLE_PAGE,
  MEDIA_ASSET_PAGE,
} from '#app/routes/utils/pageTypes';
import filterForBlockType from '#lib/utilities/blockHandlers';
import { PageTypes } from '#app/models/types/global';
import { EventTrackingContext } from '#app/contexts/EventTrackingContext';
import onClient from '#app/lib/utilities/onClient';
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
import styles, {
  PLAYER_FULLSCREEN_CLASS,
  FAKE_FULLSCREEN_LAYER_CLASS,
  FAKE_FULLSCREEN_ACTIVE_CLASS,
  ACTIVE_FULLSCREEN_LOADER_STATE,
  fakeFullscreenStyles,
} from './index.styles';
import { getBootstrapSrc } from '../Ad/Canonical';
import Metadata from './Metadata';
import AmpMediaLoader from './Amp';
import Message from './Message';

const PAGETYPES_IGNORE_PLACEHOLDER: PageTypes[] = [
  LIVE_PAGE,
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
    const timeoutID = setTimeout(() => {
      if (window.dotcom.ads.resolves) {
        window.dotcom.ads.resolves.enabled.forEach(res => res(false));
        window.dotcom.ads.resolves.getAdTag.forEach(res => res(''));
      }
    }, 2000);

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

const FAKE_FULLSCREEN_STYLE_ID = 'simorgh-fake-fullscreen-styles';

const FakeFullscreenStyles = ({ nonce }: { nonce?: string | null }) => {
  useEffect(() => {
    if (document.getElementById(FAKE_FULLSCREEN_STYLE_ID)) return;

    const styleElement = document.createElement('style');
    styleElement.id = FAKE_FULLSCREEN_STYLE_ID;
    if (nonce) styleElement.setAttribute('nonce', nonce);
    styleElement.textContent = fakeFullscreenStyles;
    document.head.appendChild(styleElement);
  }, [nonce]);

  return null;
};

const FakeFullscreenLayer = ({ isActive }: { isActive: boolean }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <div
      aria-hidden="true"
      className={`${FAKE_FULLSCREEN_LAYER_CLASS}${
        isActive ? ` ${FAKE_FULLSCREEN_ACTIVE_CLASS}` : ''
      }`}
    />,
    document.body,
  );
};

type MediaContainerProps = {
  playerConfig: PlayerConfig;
  showAds: boolean;
  uniqueId?: string;
  noJsMessage?: string;
  eventMapping?: EventMapping;
  shouldHandleFakeFullscreen?: boolean;
  loadPlayerOnInitialRender?: boolean;
  onFakeFullscreenChange?: (isActive: boolean) => void;
};

const isAudioPlayer = (playerConfig: PlayerConfig) =>
  playerConfig?.ui?.skin === 'audio';

const MediaContainer = ({
  playerConfig,
  showAds,
  uniqueId,
  noJsMessage,
  eventMapping,
  shouldHandleFakeFullscreen = false,
  loadPlayerOnInitialRender = false,
  onFakeFullscreenChange,
}: MediaContainerProps) => {
  const playerElementRef = useRef<HTMLDivElement>(null);
  const onFakeFullscreenChangeRef = useRef(onFakeFullscreenChange);
  const isAudio = isAudioPlayer(playerConfig);

  onFakeFullscreenChangeRef.current = onFakeFullscreenChange;

  useEffect(() => {
    try {
      window.requirejs(['bump-4'], (Bump: BumpType) => {
        if (playerElementRef?.current && playerConfig) {
          const initPlayer = async () => {
            const autoplayOverride = loadPlayerOnInitialRender
              ? { autoplay: false }
              : {};
            const fakeFullscreenOverride = shouldHandleFakeFullscreen
              ? { supportFakeFullscreen: true }
              : {};

            const effectiveConfig = {
              ...playerConfig,
              ...autoplayOverride,
              ...fakeFullscreenOverride,
            };

            const mediaPlayer = Bump.player(
              playerElementRef.current,
              effectiveConfig,
            );

            if (uniqueId != null) {
              const { mediaPlayers } = window;
              if (mediaPlayers == null) {
                window.mediaPlayers = { [uniqueId]: mediaPlayer };
              } else {
                mediaPlayers[uniqueId] = mediaPlayer;
              }
            }

            if (eventMapping && Object.keys(eventMapping || {}).length > 0) {
              Object.keys(eventMapping).forEach(bindingKey => {
                const key = bindingKey as MediaPlayerEvents;
                const handler = eventMapping[key];

                if (handler) mediaPlayer.bind(key, handler);
              });
            }

            if (shouldHandleFakeFullscreen) {
              mediaPlayer.bind('enterFakeFullscreen', () => {
                onFakeFullscreenChangeRef.current?.(true);
              });
              mediaPlayer.bind('exitFakeFullscreen', () => {
                onFakeFullscreenChangeRef.current?.(false);
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
  }, [
    playerConfig,
    showAds,
    uniqueId,
    eventMapping,
    shouldHandleFakeFullscreen,
    loadPlayerOnInitialRender,
  ]);

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
  loadPlayerOnInitialRender?: boolean;
  withinFullscreenContainer?: boolean;
};

const MediaLoader = ({
  blocks,
  className,
  embedded,
  uniqueId,
  eventMapping,
  loadPlayerOnInitialRender = false,
  withinFullscreenContainer = false,
}: Props) => {
  const { lang, service, translations, defaultImage } = use(ServiceContext);
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
    !loadPlayerOnInitialRender &&
      !PAGETYPES_IGNORE_PLACEHOLDER.includes(pageType),
  );
  const [isFakeFullscreenActive, setIsFakeFullscreenActive] = useState(false);
  const hasActivatedFakeFullscreenRef = useRef(false);

  useEffect(() => {
    return () => {
      if (!onClient()) return;
      if (!hasActivatedFakeFullscreenRef.current) return;

      document.documentElement.classList.remove(PLAYER_FULLSCREEN_CLASS);
      document.body.classList.remove(PLAYER_FULLSCREEN_CLASS);
    };
  }, []);

  const { model: mediaOverrides } =
    filterForBlockType(blocks, 'mediaOverrides') || {};

  const producer = getProducerFromServiceName(service);
  const counterName = mediaOverrides?.pageIdentifierOverride || pageIdentifier;

  const config = useMemo(
    () =>
      buildConfig({
        id: id || '',
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
        embedded,
        defaultImage,
      }),
    [
      id,
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
      embedded,
      defaultImage,
    ],
  );

  if (isLite) return null;

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
  const shouldHandleFakeFullscreen =
    !isAmp && !embedded && !isAudio && !withinFullscreenContainer;

  const setFakeFullscreenPageState = (isActive: boolean) => {
    if (!onClient()) return;

    document.documentElement.classList.toggle(
      PLAYER_FULLSCREEN_CLASS,
      isActive,
    );
    document.body.classList.toggle(PLAYER_FULLSCREEN_CLASS, isActive);
    hasActivatedFakeFullscreenRef.current = isActive;
    setIsFakeFullscreenActive(isActive);
  };

  return (
    <>
      {!embedded && (
        <Metadata blocks={blocks} embedURL={playerConfig?.externalEmbedUrl} />
      )}
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
            {shouldHandleFakeFullscreen && (
              <FakeFullscreenLayer isActive={isFakeFullscreenActive} />
            )}
            <div
              css={styles.mediaPlayerWrapper({
                isPortrait,
                isFakeFullscreenActive,
              })}
              data-simorgh-media-loader={
                isFakeFullscreenActive
                  ? ACTIVE_FULLSCREEN_LOADER_STATE
                  : 'inactive'
              }
            >
              {showAds && <AdvertTagLoader />}
              <BumpLoader nonce={nonce} />
              {shouldHandleFakeFullscreen && (
                <FakeFullscreenStyles nonce={nonce} />
              )}
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
                  shouldHandleFakeFullscreen={shouldHandleFakeFullscreen}
                  loadPlayerOnInitialRender={loadPlayerOnInitialRender}
                  onFakeFullscreenChange={setFakeFullscreenPageState}
                />
              )}
            </div>
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
