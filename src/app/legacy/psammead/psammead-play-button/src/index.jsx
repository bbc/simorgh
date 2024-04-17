/** @jsx jsx */
import { jsx } from '@emotion/react';
import { string, oneOf, func } from 'prop-types';
import styled from '@emotion/styled';
import {
  GEL_SPACING,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';
import { GEL_MINION } from '#psammead/gel-foundations/src/typography';
import { getSansBold } from '#psammead/psammead-styles/src/font-styles';
import { mediaIcons } from '#psammead/psammead-assets/src/svgs';
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';

const GEL_SPACING_DEC = '5rem';
const BGC_TRANSITION_DURATION = '300ms';

const Button = styled.button`
  background-color: ${props => props.theme.palette.EBON};
  border: none;
  color: ${props => props.theme.palette.WHITE};
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
    background-color: ${props => props.theme.palette.POSTBOX};
    transition: background-color ${BGC_TRANSITION_DURATION};
  }
`;

const IconWrapper = styled.div`
  > svg {
    color: ${props => props.theme.palette.WHITE};
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
        <TimeDuration
          dateTime={datetime}
          aria-hidden="true"
          suppressHydrationWarning
        >
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
