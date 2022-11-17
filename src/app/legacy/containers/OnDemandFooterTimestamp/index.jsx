import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { bool, number } from 'prop-types';
import { C_PEBBLE, C_METAL } from '#psammead/psammead-styles/src/colours';
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
  color: ${({ darkMode }) => (darkMode ? C_PEBBLE : C_METAL)};
  display: inline-block;

  ${({ darkMode }) => !darkMode && smallScreenMargin}
`;

const OnDemandFooterTimestamp = ({ releaseDateTimeStamp, darkMode }) => {
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
      darkMode={darkMode}
      dateTime={dateTime}
    >
      {formattedTimestamp}
    </Wrapper>
  );
};

OnDemandFooterTimestamp.propTypes = {
  releaseDateTimeStamp: number.isRequired,
  darkMode: bool,
};

OnDemandFooterTimestamp.defaultProps = {
  darkMode: false,
};

export default OnDemandFooterTimestamp;
