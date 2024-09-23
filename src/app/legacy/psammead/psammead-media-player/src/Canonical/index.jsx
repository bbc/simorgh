import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import ImagePlaceholder from '#psammead/psammead-image-placeholder/src';
import Message from '../Message';

// XSS protection to ensure we only react to events sent from recognised origins
const escapeRegex = token => token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// XSS protection to ensure we only react to events sent from recognised origins
const isValidEvent = ({ origin }, acceptableEventOrigins) => {
  const escapedOrigins = acceptableEventOrigins.map(escapeRegex);
  return RegExp(`^https?://(${escapedOrigins.join('|')})(:|/|$)`, 'i').test(
    origin,
  );
};

const Canonical = ({
  src,
  placeholderSrcset = '',
  title,
  placeholderSrc = null,
  service,
  noJsMessage,
  showPlaceholder,
  showLoadingImage,
  darkPlaceholder,
  onMediaInitialised,
  onMediaPlaying,
  onMediaPause,
  onMediaEnded,
  onMediaPlaylistEnded,
  onMediaError,
  acceptableEventOrigins = [
    'www.test.bbc.com',
    'web-cdn.test.api.bbci.co.uk',
    'www.bbc.com',
    'web-cdn.api.bbci.co.uk',
    'localhost.bbc.com',
    'localhost',
  ],
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

      // lgtm[js/unvalidated-dynamic-method-call]
      if (callback) callback(e);
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StyledIframe
        src={src}
        title={title}
        allow="autoplay"
        scrolling="no"
        gesture="media"
        loading="lazy"
        allowFullScreen
        width="645.25"
        height="362.953125"
      />
      {showLoadingImage && (
        <LoadingImageWrapper>
          <ImagePlaceholder ratio={56.25} darkPlaceholder={darkPlaceholder} />
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

export default Canonical;
