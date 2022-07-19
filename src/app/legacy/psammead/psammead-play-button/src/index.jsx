import React from 'react';
import { string, oneOf, func } from 'prop-types';
import styled from '@emotion/styled';
import {
  C_EBON,
  C_WHITE,
  C_POSTBOX,
} from '#legacy/psammead-styles/src/colours';
import {
  GEL_SPACING,
  GEL_SPACING_TRPL,
} from '#legacy/gel-foundations/src/spacings';
import { GEL_MINION } from '#legacy/gel-foundations/src/typography';
import { getSansBold } from '#legacy/psammead-styles/src/font-styles';
import { mediaIcons } from '#legacy/psammead-assets/src/svgs';
import VisuallyHiddenText from '#legacy/psammead-visually-hidden-text/src';

const GEL_SPACING_DEC = '5rem';
const BGC_TRANSITION_DURATION = '300ms';

const Button = styled.button`
  background-color: ${C_EBON};
  border: none;
  color: ${C_WHITE};
  cursor: pointer;
  display: block;
  ${({ service }) => getSansBold(service)}
  ${GEL_MINION};
  height: ${GEL_SPACING_DEC};
  padding: 0;
  transition: background-color ${BGC_TRANSITION_DURATION};
  width: ${GEL_SPACING_DEC};

  &:hover,
  &:focus {
    background-color: ${C_POSTBOX};
    transition: background-color ${BGC_TRANSITION_DURATION};
  }
`;

const IconWrapper = styled.div`
  > svg {
    color: ${C_WHITE};
    fill: currentColor;
    height: ${GEL_SPACING_TRPL};
    ${({ datetime, duration, durationSpoken }) =>
      datetime &&
      duration &&
      durationSpoken &&
      `
        margin-top: ${GEL_SPACING};
      `}
    width: ${GEL_SPACING_TRPL};
  }
`;

const TimeDuration = styled.time`
  display: block;
  margin-top: ${GEL_SPACING};
`;

const PlayButton = ({
  className,
  datetime,
  duration,
  durationSpoken,
  type,
  service,
  title,
  onClick,
  guidanceMessage,
}) => {
  const hiddenText = `${guidanceMessage || ''} Play ${type}, ${
    datetime && duration && durationSpoken
      ? `"${title}", ${durationSpoken}`
      : `"${title}"`
  } `.trim();

  return (
    <Button className={className} service={service} onClick={onClick}>
      <VisuallyHiddenText>{hiddenText}</VisuallyHiddenText>
      <IconWrapper
        datetime={datetime}
        duration={duration}
        durationSpoken={durationSpoken}
        aria-hidden="true"
      >
        {mediaIcons[type]}
      </IconWrapper>
      {datetime && duration && durationSpoken && (
        <TimeDuration dateTime={datetime} aria-hidden="true">
          {duration}
        </TimeDuration>
      )}
    </Button>
  );
};

PlayButton.propTypes = {
  datetime: string,
  duration: string,
  durationSpoken: string,
  type: oneOf(['video', 'audio']),
  title: string.isRequired,
  service: string.isRequired,
  onClick: func.isRequired,
  className: string,
  guidanceMessage: string,
};

PlayButton.defaultProps = {
  datetime: null,
  duration: null,
  durationSpoken: null,
  type: 'video',
  className: null,
  guidanceMessage: null,
};

export default PlayButton;
