/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { RequestContext } from '#contexts/RequestContext';
import { MEDIA_PLAYER_STATUS } from '#app/lib/logger.const';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { BumpType, MediaBlock, PlayerConfig } from './types';
import Caption from '../Caption';
import nodeLogger from '../../lib/logger.node';
import buildConfig from './utils/buildSettings';
import Placeholder from './Placeholder';
import getProducerFromServiceName from './utils/getProducerFromServiceName';
import getCaptionBlock from './utils/getCaptionBlock';
import styles from './index.styles';

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

const AdvertTagLoader = () => (
  <Helmet>
    <script type="text/javascript">
      {`window.dotcom = window.dotcom || { cmd: [] };
        window.dotcom.ads = window.dotcom.ads || {
            resolves: {
                enabled: [],
                getAdTag: []
            },
            enabled: function() {
                return new Promise(function(resolve){
                    window.dotcom.ads.resolves.enabled.push(resolve);
                });
            },
            getAdTag: function() {
                return new Promise(function(resolve){
                    window.dotcom.ads.resolves.getAdTag.push(resolve);
                });
            }
        }
        // resolve to ads NOT enabled if dotcom-bootstrap.js doesn't load in a couple of seconds
        setTimeout(() => {
            if(window.dotcom.ads.resolves){
                window.dotcom.ads.resolves.enabled.forEach(res => res(false));
                window.dotcom.ads.resolves.getAdTag.forEach(res => res(""));
            }
        }, 2000)
        window.dotcomConfig = {
            pageAds: false,
            playerAds: true
        };`}
    </script>
    <script
      type="module"
      src="https://gn-web-assets.api.bbc.com/ngas/dotcom-bootstrap.js"
      async
    />
    <script
      noModule
      src="https://gn-web-assets.api.bbc.com/ngas/dotcom-bootstrap-legacy.js"
      async
    />
  </Helmet>
);

const MediaContainer = ({ playerConfig }: { playerConfig: PlayerConfig }) => {
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
        }
      });
    } catch (error) {
      logger.error(MEDIA_PLAYER_STATUS, error);
    }
  }, [playerConfig]);

  return <div ref={playerElementRef} data-e2e="media-player" />;
};

type Props = {
  className?: string;
  blocks: MediaBlock[];
};

const MediaLoader = ({ blocks, className }: Props) => {
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const { id, pageType, counterName, statsDestination, service, isAmp } =
    useContext(RequestContext);
  const { lang, translations } = useContext(ServiceContext);

  const producer = getProducerFromServiceName(service);

  const config = buildConfig({
    blocks,
    counterName,
    statsDestination,
    producer,
    id,
    isAmp,
    lang,
    pageType,
    service,
    translations,
  });

  if (!config) return null;

  const { mediaType, playerConfig, placeholderConfig } = config;

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
      <AdvertTagLoader />
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
      {captionBlock && <Caption block={captionBlock} type={mediaType} />}
    </figure>
  );
};

export default MediaLoader;
