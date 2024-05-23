import React, { useState, memo } from 'react';
import styled from '@emotion/styled';
import equals from 'ramda/src/equals';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '#psammead/gel-foundations/src/spacings';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';
import Placeholder from './Placeholder';
import Amp from './Amp';
import Canonical from './Canonical';
import Message from './Message';

const landscapeRatio = '56.25%'; // (9/16)*100 = 16:9
const portraitRatio = '177.78%'; // (16/9)*100 = 9:16
const StyledVideoContainer = styled.div`
  padding-top: ${({ portrait }) => (portrait ? portraitRatio : landscapeRatio)};
  position: relative;
  overflow: hidden;
`;

const StyledAudioContainer = styled.div`
  height: 165px;
  position: relative;
  margin-bottom: ${GEL_SPACING_DBL};

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-bottom: ${GEL_SPACING_QUAD};
  }
`;

const noop = () => {};

const CanonicalMediaPlayerComponent = ({
  showPlaceholder = true,
  placeholderSrc = null,
  placeholderSrcset = null,
  portrait = false,
  src,
  title,
  skin = 'classic',
  service,
  mediaInfo = {},
  noJsClassName = null,
  noJsMessage,
  showLoadingImage = false,
  darkPlaceholder = false,
  onMediaInitialised = noop,
  onMediaPlaying = noop,
  onMediaPause = noop,
  onMediaEnded = noop,
  onMediaPlaylistEnded = noop,
  onMediaError = noop,
  acceptableEventOrigins = [
    'www.test.bbc.com',
    'polling.test.bbc.com',
    'www.bbc.com',
    'polling.bbc.com',
    'localhost.bbc.com',
    'localhost',
  ],
}) => {
  const [placeholderActive, setPlaceholderActive] = useState(showPlaceholder);
  const handlePlaceholderClick = () => setPlaceholderActive(false);

  const StyledContainer =
    skin === 'audio' ? StyledAudioContainer : StyledVideoContainer;

  return (
    <StyledContainer data-e2e="media-player" portrait={portrait}>
      {placeholderActive ? (
        <Placeholder
          onClick={handlePlaceholderClick}
          src={placeholderSrc}
          srcset={placeholderSrcset}
          service={service}
          mediaInfo={mediaInfo}
          noJsClassName={noJsClassName}
          noJsMessage={noJsMessage}
        />
      ) : (
        <Canonical
          src={src}
          placeholderSrcset={placeholderSrcset}
          showPlaceholder={showPlaceholder}
          title={title}
          placeholderSrc={placeholderSrc}
          service={service}
          noJsMessage={noJsMessage}
          showLoadingImage={showLoadingImage}
          darkPlaceholder={darkPlaceholder}
          onMediaInitialised={onMediaInitialised}
          onMediaPlaying={onMediaPlaying}
          onMediaPause={onMediaPause}
          onMediaEnded={onMediaEnded}
          onMediaPlaylistEnded={onMediaPlaylistEnded}
          onMediaError={onMediaError}
          acceptableEventOrigins={acceptableEventOrigins}
        />
      )}
    </StyledContainer>
  );
};

// Component receives a "mediaInfo" object prop - this can cause unnecessary
// re-renders when the object reference changes, but the content is the same.
// We only rerender if the prevProps and nextProps fail deep equality check
export const CanonicalMediaPlayer = memo(CanonicalMediaPlayerComponent, equals);

export const AmpMediaPlayer = ({
  placeholderSrcset = null,
  placeholderSrc,
  portrait = false,
  src,
  title,
  skin = 'classic',
  noJsMessage,
  service,
}) => {
  const StyledContainer =
    skin === 'audio' ? StyledAudioContainer : StyledVideoContainer;

  return (
    <StyledContainer portrait={portrait}>
      <Amp
        placeholderSrcset={placeholderSrcset}
        placeholderSrc={placeholderSrc}
        src={src}
        title={title}
        height={portrait ? 9 : 16}
        width={portrait ? 16 : 9}
        noJsMessage={noJsMessage}
        service={service}
      />
    </StyledContainer>
  );
};

export const MediaMessage = Message;
