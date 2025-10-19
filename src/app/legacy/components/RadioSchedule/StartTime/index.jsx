import React, { use } from 'react';
import styled from '@emotion/styled';
import { GEL_SPACING_HLF } from '#psammead/gel-foundations/src/spacings';
import { coreIcons } from '#psammead/psammead-assets/src/svgs';
import TimestampContainer from '#psammead/psammead-timestamp-container/src';
import { ServiceContext } from '../../../../contexts/ServiceContext';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledClock = styled.span`
  display: flex;
  align-items: center;
  ${({ dir }) =>
    dir === 'ltr'
      ? `padding-right: ${GEL_SPACING_HLF};`
      : `padding-left: ${GEL_SPACING_HLF};`}
  > svg {
    color: ${props => props.theme.palette.RHINO};
    margin: 0;
    overflow: visible;
    @media screen and (forced-colors: active) {
      fill: canvasText;
    }
  }
`;

const ClockIcon = ({ dir = 'ltr' }) => {
  return <StyledClock dir={dir}>{coreIcons.clock}</StyledClock>;
};

const StyledTimestamp = styled.span`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;

  > time {
    color: ${props => props.theme.palette.RHINO};
    ${({ theme: { fontSizes } }) => fontSizes.minion};
    ${({ theme: { fontVariants } }) => fontVariants.sansRegular};
  }

  &::after {
    content: '';
    border-top: 0.0625rem solid ${props => props.theme.palette.PEBBLE};
    top: ${({ theme: { fontSizes } }) =>
      0.5 + fontSizes.minion.lineHeight / 2 / 16}rem;
    ${({ dir }) =>
      dir === 'ltr' ? `margin-left: 0.625rem;` : `margin-right: 0.625rem;`}
    width: 100%;
  }
`;

export const StartTimestamp = ({
  timestamp,
  timezone = 'Europe/London',
  locale = 'en-gb',
  dir = 'ltr',
}) => {
  return (
    <StyledTimestamp dir={dir} aria-hidden="true">
      <TimestampContainer
        timestamp={timestamp}
        dateTimeFormat="YYYY-MM-DD"
        format="HH:mm"
        isRelative={false}
        padding={false}
        timezone={timezone}
        locale={locale}
      />
    </StyledTimestamp>
  );
};

const StartTime = ({ timestamp }) => {
  const { locale, timezone, dir } = use(ServiceContext);
  return (
    <Wrapper>
      <ClockIcon dir={dir} />
      <StartTimestamp
        timestamp={timestamp}
        timezone={timezone}
        locale={locale}
        dir={dir}
      />
    </Wrapper>
  );
};

export default StartTime;
