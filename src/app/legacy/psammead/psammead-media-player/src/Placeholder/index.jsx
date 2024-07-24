import React from 'react';
import styled from '@emotion/styled';
import Image from '#psammead/psammead-image/src';
import PlayButton from '#psammead/psammead-play-button/src';
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
      background-color: ${props => props.theme.palette.POSTBOX};
    }
  }
`;

const Placeholder = ({
  onClick,
  service,
  src,
  srcset = null,
  mediaInfo = {
    datetime: null,
    duration: null,
    durationSpoken: null,
    type: 'video',
    guidanceMessage: null,
  },
  noJsClassName = null,
  noJsMessage,
}) => {
  const { title, datetime, duration, durationSpoken, type, guidanceMessage } =
    mediaInfo;

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

export default Placeholder;
