import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { bool, number } from 'prop-types';
import { C_PEBBLE, C_METAL } from '@bbc/psammead-styles/colours';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { getLongPrimer } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { formatUnixTimestamp } from '@bbc/psammead-timestamp-container/utilities';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/breakpoints';

import { ServiceContext } from '#contexts/ServiceContext';

const smallScreenMargin = `
  @media(max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    margin-top: 0;
  }
`;

const Wrapper = styled.time`
  ${({ script }) => script && getLongPrimer(script)}
  ${({ service }) => getSansRegular(service)}
  color: ${({ darkMode }) => (darkMode ? C_PEBBLE : C_METAL)};
  margin-top: ${GEL_SPACING};
  display: inline-block;

  ${({ darkMode }) => !darkMode && smallScreenMargin}
`;

const OnDemandFooterTimestamp = ({ releaseDateTimeStamp, darkMode }) => {
  const { script, service, timezone, datetimeLocale } = useContext(
    ServiceContext,
  );
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
