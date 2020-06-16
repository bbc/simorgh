import React, { useContext } from 'react';
import { string } from 'prop-types';
import {
  CanonicalMediaPlayer,
  AmpMediaPlayer,
} from '@bbc/psammead-media-player';
import pathOr from 'ramda/src/pathOr';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';

const staticAssetsPath = `${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}`;

const audioPlaceholderImageSrc = `${staticAssetsPath}images/amp_audio_placeholder.png`;

const LIVE_RADIO_ASSET_ID = 'liveradio';

const isLiveRadio = assetId => assetId === LIVE_RADIO_ASSET_ID;

const getMediaInfo = assetId => ({
  title: isLiveRadio(assetId) ? 'Live radio' : 'On-demand radio',
  type: 'audio',
});

const getMasterBrand = (masterBrand, liveRadioIdOverrides) =>
  pathOr(masterBrand, ['masterBrand', masterBrand], liveRadioIdOverrides);

const AudioPlayer = ({
  externalId: _masterBrand,
  id: assetId,
  idAttr,
  embedUrl,
  className,
}) => {
  const { liveRadioOverrides, translations, service } = useContext(
    ServiceContext,
  );
  const masterBrand = getMasterBrand(_masterBrand, liveRadioOverrides);
  const { isAmp, platform } = useContext(RequestContext);
  const isValidPlatform = ['amp', 'canonical'].includes(platform);
  const mediaInfo = getMediaInfo(assetId);
  const noJsMessage = pathOr(
    `This ${mediaInfo.type} cannot play in your browser. Please enable JavaScript or try a different browser.`,
    ['media', 'noJs'],
    translations,
  );

  if (!isValidPlatform || !masterBrand || !assetId) return null; // potential for logging here

  const iframeTitle = pathOr(
    'Media player',
    ['mediaAssetPage', 'audioPlayer'],
    translations,
  );

  return (
    <div className={className}>
      {isAmp ? (
        <AmpMediaPlayer
          placeholderSrc={audioPlaceholderImageSrc}
          src={embedUrl}
          title={iframeTitle}
          id={idAttr}
          skin="audio"
          noJsMessage={noJsMessage}
          service={service}
        />
      ) : (
        <CanonicalMediaPlayer
          showPlaceholder={false}
          src={embedUrl}
          title={iframeTitle}
          id={idAttr}
          skin="audio"
          service={service}
          mediaInfo={mediaInfo}
          noJsMessage={noJsMessage}
          noJsClassName="no-js"
        />
      )}
    </div>
  );
};

AudioPlayer.propTypes = {
  externalId: string,
  id: string,
  idAttr: string,
  embedUrl: string,
  className: string,
};

AudioPlayer.defaultProps = {
  externalId: '',
  id: '',
  idAttr: null,
  embedUrl: '',
  className: '',
};

export default AudioPlayer;
