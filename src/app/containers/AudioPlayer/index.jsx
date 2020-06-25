import React, { useContext } from 'react';
import { string } from 'prop-types';
import {
  CanonicalMediaPlayer,
  AmpMediaPlayer,
} from '@bbc/psammead-media-player';
import pathOr from 'ramda/src/pathOr';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';

const AudioPlayer = ({
  assetId,
  imageUrl,
  embedUrl,
  title,
  type,
  iframeTitle,
  className,
}) => {
  const { translations, service } = useContext(ServiceContext);

  const { isAmp } = useContext(RequestContext);
  const mediaInfo = { title, type };
  const noJsMessage = pathOr(
    `This ${mediaInfo.type} cannot play in your browser. Please enable JavaScript or try a different browser.`,
    ['media', 'noJs'],
    translations,
  );

  if (!assetId) return null;

  return (
    <div className={className}>
      {isAmp ? (
        <AmpMediaPlayer
          placeholderSrc={imageUrl}
          src={embedUrl}
          title={iframeTitle}
          skin="audio"
          noJsMessage={noJsMessage}
          service={service}
        />
      ) : (
        <CanonicalMediaPlayer
          showPlaceholder={false}
          src={embedUrl}
          title={iframeTitle}
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
  imageUrl: string,
  embedUrl: string,
  type: string,
  title: string,
  className: string,
  iframeTitle: string,
};

AudioPlayer.defaultProps = {
  assetId: '',
  imageUrl: '',
  type: '',
  title: '',
  embedUrl: '',
  iframeTitle: '',
  className: '',
};

export default AudioPlayer;
