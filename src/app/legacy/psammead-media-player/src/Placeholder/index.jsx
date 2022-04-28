import React from 'react';
import styled from '@emotion/styled';
import { string, func, shape, oneOf } from 'prop-types';
import Image from '@bbc/psammead-image';
import PlayButton from '@bbc/psammead-play-button';
import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import Guidance from '../Guidance';

const StyledPlayButton = styled(PlayButton)`
  position: absolute;
  bottom: 0;
  ${({ noJsClassName }) =>
    noJsClassName &&
    `.${noJsClassName} & {
        display: none;
      }
    `}
`;

const StyledPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  ${({ noJsClassName }) => `cursor: ${noJsClassName ? 'default' : 'pointer'};`}

  &:hover, &:focus {
    ${StyledPlayButton} {
      background-color: ${C_POSTBOX};
    }
  }
`;

const Placeholder = ({
  onClick,
  service,
  src,
  srcset,
  mediaInfo,
  noJsClassName,
  noJsMessage,
}) => {
  const {
    title,
    datetime,
    duration,
    durationSpoken,
    type,
    guidanceMessage,
  } = mediaInfo;

  return (
    <StyledPlaceholder
      data-e2e="media-player__placeholder"
      onClick={onClick}
      noJsClassName={noJsClassName}
    >
      <Guidance
        service={service}
        guidanceMessage={guidanceMessage}
        noJsClassName={noJsClassName}
        noJsMessage={noJsMessage}
      />
      <StyledPlayButton
        title={title}
        service={service}
        onClick={() => {}}
        datetime={datetime}
        duration={duration}
        durationSpoken={durationSpoken}
        type={type}
        guidanceMessage={guidanceMessage}
        noJsClassName={noJsClassName}
      />

      <Image alt="" src={src} srcset={srcset} />
    </StyledPlaceholder>
  );
};

Placeholder.propTypes = {
  onClick: func.isRequired,
  service: string.isRequired,
  src: string.isRequired,
  srcset: string,
  noJsClassName: string,
  noJsMessage: string.isRequired,
  mediaInfo: shape({
    title: string.isRequired,
    datetime: string,
    duration: string,
    durationSpoken: string,
    type: oneOf(['audio', 'video']),
    guidanceMessage: string,
  }),
};
Placeholder.defaultProps = {
  srcset: null,
  noJsClassName: null,
  mediaInfo: shape({
    datetime: null,
    duration: null,
    durationSpoken: null,
    type: 'video',
    guidanceMessage: null,
  }),
};

export default Placeholder;
