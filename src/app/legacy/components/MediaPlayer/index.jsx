import React, { useState, memo } from 'react';
import styled from '@emotion/styled';
import { string, bool, oneOf, shape, func, arrayOf } from 'prop-types';
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

const CanonicalMediaPlayerComponent = ({
  showPlaceholder,
  placeholderSrc,
  placeholderSrcset,
  portrait,
  src,
  title,
  skin,
  service,
  mediaInfo,
  noJsClassName,
  noJsMessage,
  showLoadingImage,
  darkPlaceholder,
  onMediaInitialised,
  onMediaPlaying,
  onMediaPause,
  onMediaEnded,
  onMediaPlaylistEnded,
  onMediaError,
  acceptableEventOrigins,
}) => {
  const [placeholderActive, setPlaceholderActive] = useState(showPlaceholder);
  const handlePlaceholderClick = () => setPlaceholderActive(false);

  const StyledContainer =
    skin === 'audio' ? StyledAudioContainer : StyledVideoContainer;

  return (
    <StyledContainer portrait={portrait} data-e2e="media-player">
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
  placeholderSrcset,
  placeholderSrc,
  portrait,
  src,
  title,
  skin,
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
        noJsMessage={noJsMessage}
        service={service}
      />
    </StyledContainer>
  );
};

export const MediaMessage = Message;

CanonicalMediaPlayerComponent.propTypes = {
  placeholderSrc: string,
  placeholderSrcset: string,
  portrait: bool,
  showPlaceholder: bool,
  src: string.isRequired,
  title: string.isRequired,
  skin: oneOf(['classic', 'audio']),
  service: string.isRequired,
  noJsClassName: string,
  noJsMessage: string.isRequired,
  mediaInfo: shape({
    title: string,
    datetime: string,
    duration: string,
    durationSpoken: string,
    type: oneOf(['video', 'audio']),
    guidanceMessage: string,
  }),
  showLoadingImage: bool,
  darkPlaceholder: bool,
  onMediaInitialised: func,
  onMediaPlaying: func,
  onMediaPause: func,
  onMediaEnded: func,
  onMediaPlaylistEnded: func,
  onMediaError: func,
  acceptableEventOrigins: arrayOf(string),
};

const noop = () => {};

CanonicalMediaPlayerComponent.defaultProps = {
  portrait: false,
  showPlaceholder: true,
  skin: 'classic',
  placeholderSrc: null,
  placeholderSrcset: null,
  noJsClassName: null,
  mediaInfo: {},
  showLoadingImage: false,
  darkPlaceholder: false,
  onMediaInitialised: noop,
  onMediaPlaying: noop,
  onMediaPause: noop,
  onMediaEnded: noop,
  onMediaPlaylistEnded: noop,
  onMediaError: noop,
  acceptableEventOrigins: [
    'www.test.bbc.com',
    'test.bbc.com',
    'polling.test.bbc.com',
    'www.bbc.com',
    'bbc.com',
    'polling.bbc.com',
    'localhost.bbc.com',
    'localhost',
  ],
};

MediaMessage.propTypes = {
  service: string.isRequired,
  message: string.isRequired,
  placeholderSrc: string,
  placeholderSrcset: string,
};

MediaMessage.defaultProps = {
  placeholderSrc: null,
  placeholderSrcset: null,
};

AmpMediaPlayer.propTypes = {
  placeholderSrc: string.isRequired,
  placeholderSrcset: string,
  portrait: bool,
  src: string.isRequired,
  title: string.isRequired,
  skin: oneOf(['classic', 'audio']),
  noJsMessage: string.isRequired,
  service: string.isRequired,
};

AmpMediaPlayer.defaultProps = {
  portrait: false,
  skin: 'classic',
  placeholderSrcset: null,
};
