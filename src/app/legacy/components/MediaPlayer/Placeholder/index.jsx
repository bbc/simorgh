import React from 'react';
import styled from '@emotion/styled';
import { string, func, shape, oneOf } from 'prop-types';
import Image from '#psammead/psammead-image/src';
import PlayButton from '#psammead/psammead-play-button/src';
import Guidance from '../Guidance';
import { focusIndicatorThickness } from '../../../../components/ThemeProvider/focusIndicator';

const placeholderOutline = `
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const StyledPlayButton = styled(PlayButton)`
  position: absolute;
  bottom: 0;
  left: 0;
  ${({ noJsClassName }) =>
    noJsClassName &&
    `.${noJsClassName} & {
        display: none;
      }
    `}

  // Custom focus indicator styling applied to pseudo-element. Global focus indicator styling has been removed.
  &:focus-visible::before {
    ${placeholderOutline}
    box-shadow: 0 0 0 ${focusIndicatorThickness}  ${props =>
      props.theme.palette.WHITE} inset;
    border: ${focusIndicatorThickness} solid
      ${props => props.theme.palette.BLACK};
  }
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
  srcset,
  mediaInfo,
  noJsClassName,
  noJsMessage,
}) => {
  const { title, datetime, duration, durationSpoken, type, guidanceMessage } =
    mediaInfo;

  return (
    <StyledPlaceholder
      onClick={onClick}
      noJsClassName={noJsClassName}
      data-e2e="media-player__placeholder"
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
        className="focusIndicatorRemove"
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
