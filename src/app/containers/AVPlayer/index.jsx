import React, { useContext } from 'react';
import { string } from 'prop-types';
import {
  CanonicalMediaPlayer,
  AmpMediaPlayer,
} from '@bbc/psammead-media-player';
import pathOr from 'ramda/src/pathOr';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';

const AVPlayer = ({
  assetId,
  placeholderSrc,
  title,
  embedUrl,
  iframeTitle,
  type,
  skin,
  className,
}) => {
  const { translations, service } = useContext(ServiceContext);
  const { isAmp, platform } = useContext(RequestContext);

  const isValidPlatform = ['amp', 'canonical'].includes(platform);
  const mediaInfo = {
    title,
    type,
  };
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
          placeholderSrc={placeholderSrc}
          src={embedUrl}
          title={iframeTitle}
          skin={skin}
          noJsMessage={noJsMessage}
          service={service}
        />
      ) : (
        <CanonicalMediaPlayer
          showPlaceholder={false}
          src={embedUrl}
          title={iframeTitle}
          skin={skin}
          service={service}
          mediaInfo={mediaInfo}
          noJsMessage={noJsMessage}
          noJsClassName="no-js"
        />
      )}
    </div>
  );
};

AVPlayer.propTypes = {
  embedUrl: string,
  assetId: string,
  placeholderSrc: string,
  type: string,
  title: string,
  iframeTitle: string,
  className: string,
  skin: string,
};

AVPlayer.defaultProps = {
  embedUrl: '',
  assetId: '',
  placeholderSrc: '',
  type: '',
  title: '',
  iframeTitle: '',
  className: '',
  skin: 'classic',
};

export default AVPlayer;
