import React, { useEffect } from 'react';
import { string, bool, func, arrayOf } from 'prop-types';
import styled from '@emotion/styled';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import Message from '../Message';

// XSS protection to ensure we only react to events sent from recognised origins
const isValidEvent = ({ origin }, acceptableEventOrigins) =>
  RegExp(`^https?://(${acceptableEventOrigins.join('|')})(:|/|$)`, 'i').test(
    origin,
  );

const Canonical = ({
  src,
  placeholderSrcset,
  title,
  placeholderSrc,
  service,
  noJsMessage,
  showPlaceholder,
  showLoadingImage,
  darkMode,
  onMediaInitialised,
  onMediaPlaying,
  onMediaPause,
  onMediaEnded,
  onMediaPlaylistEnded,
  onMediaError,
  acceptableEventOrigins,
}) => {
  const backgroundStyle = `
    background-image: url(${placeholderSrc});
    background-repeat: no-repeat;
    background-size: contain;
  `;

  const LoadingImageWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  `;

  const StyledIframe = styled.iframe`
    ${showLoadingImage ? `z-index: 1` : ''};
    border: 0;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    ${showPlaceholder ? backgroundStyle : null}
  `;

  useEffect(() => {
    const handler = e => {
      if (!isValidEvent(e, acceptableEventOrigins)) return;

      const callback = {
        mediaInitialised: onMediaInitialised,
        mediaPlaying: onMediaPlaying,
        mediaPause: onMediaPause,
        mediaEnded: onMediaEnded,
        mediaPlaylistEnded: onMediaPlaylistEnded,
        mediaError: onMediaError,
      }[e.data.event];

      if (callback) callback(e);
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <>
      <StyledIframe
        src={src}
        title={title}
        allow="autoplay"
        scrolling="no"
        gesture="media"
        allowFullScreen
      />
      {showLoadingImage && (
        <LoadingImageWrapper>
          <ImagePlaceholder ratio={56.25} darkMode={darkMode} />
        </LoadingImageWrapper>
      )}
      <noscript>
        <Message
          service={service}
          message={noJsMessage}
          placeholderSrc={placeholderSrc}
          placeholderSrcset={placeholderSrcset}
        />
      </noscript>
    </>
  );
};

Canonical.propTypes = {
  src: string.isRequired,
  placeholderSrcset: string,
  title: string.isRequired,
  placeholderSrc: string,
  service: string.isRequired,
  noJsMessage: string.isRequired,
  showPlaceholder: bool.isRequired,
  showLoadingImage: bool.isRequired,
  darkMode: bool.isRequired,
  onMediaInitialised: func.isRequired,
  onMediaPlaying: func.isRequired,
  onMediaPause: func.isRequired,
  onMediaEnded: func.isRequired,
  onMediaPlaylistEnded: func.isRequired,
  onMediaError: func.isRequired,
  acceptableEventOrigins: arrayOf(string),
};

Canonical.defaultProps = {
  placeholderSrc: null,
  placeholderSrcset: '',
  acceptableEventOrigins: [
    'www.test.bbc.com',
    'polling.test.bbc.com',
    'www.bbc.com',
    'polling.bbc.com',
    'localhost.bbc.com',
    'localhost',
  ],
};

export default Canonical;
