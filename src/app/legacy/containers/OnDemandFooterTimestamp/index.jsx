import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { getLongPrimer } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { formatUnixTimestamp } from '#psammead/psammead-timestamp-container/src/utilities';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '#psammead/gel-foundations/src/breakpoints';

import { ServiceContext } from '../../../contexts/ServiceContext';

const smallScreenMargin = `
  @media(max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    margin-top: 0;
  }
`;

const Wrapper = styled.time`
  ${({ script }) => script && getLongPrimer(script)}
  ${({ service }) => getSansRegular(service)}
  color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.PEBBLE : theme.palette.METAL};
  display: inline-block;

  ${({ theme }) => !theme.isDarkUi && smallScreenMargin}
`;

const OnDemandFooterTimestamp = ({ releaseDateTimeStamp }) => {
  const { script, service, timezone, datetimeLocale } =
    useContext(ServiceContext);
  const formattedTimestamp = formatUnixTimestamp({
    timestamp: releaseDateTimeStamp,
    format: 'LL',
    timezone,
    locale: datetimeLocale,
    isRelative: false,
  });
  const dateTime = formatUnixTimestamp({
    timestamp: releaseDateTimeStamp,
    format: 'YYYY-MM-DD',
    timezone,
    locale: datetimeLocale,
    isRelative: false,
  });

  return (
    <Wrapper
      script={script}
      service={service}
      dateTime={dateTime}
      suppressHydrationWarning
    >
      {formattedTimestamp}
    </Wrapper>
  );
};

export default OnDemandFooterTimestamp;
