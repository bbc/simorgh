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

const AudioPlayer = ({
  assetId,
  idAttr,
  embedUrl,
  title,
  type,
  iframeTitle,
  className,
}) => {
  const { translations, service } = useContext(ServiceContext);

  const { isAmp, platform } = useContext(RequestContext);
  const isValidPlatform = ['amp', 'canonical'].includes(platform);
  const mediaInfo = { title, type };
  const noJsMessage = pathOr(
    `This ${mediaInfo.type} cannot play in your browser. Please enable JavaScript or try a different browser.`,
    ['media', 'noJs'],
    translations,
  );

  if (!isValidPlatform || !assetId) return null;

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
  assetId: string,
  idAttr: string,
  embedUrl: string,
  type: string,
  title: string,
  className: string,
  iframeTitle: string,
};

AudioPlayer.defaultProps = {
  assetId: '',
  idAttr: null,
  type: '',
  title: '',
  embedUrl: '',
  iframeTitle: '',
  className: '',
};

export default AudioPlayer;
