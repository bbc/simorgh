import React from 'react';
import { string, oneOf, func } from 'prop-types';
import styled from '@emotion/styled';
import { C_EBON, C_WHITE, C_POSTBOX } from '@bbc/psammead-styles/colours';
import { GEL_SPACING, GEL_SPACING_TRPL } from '@bbc/gel-foundations/spacings';
import { GEL_MINION } from '@bbc/gel-foundations/typography';
import { getSansBold } from '@bbc/psammead-styles/font-styles';
import { mediaIcons } from '@bbc/psammead-assets/svgs';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';

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
