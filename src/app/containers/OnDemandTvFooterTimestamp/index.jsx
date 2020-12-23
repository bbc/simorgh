import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { number } from 'prop-types';
import { C_PEBBLE } from '@bbc/psammead-styles/colours';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { getLongPrimer } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { formatUnixTimestamp } from '@bbc/psammead-timestamp-container/utilities';

import { ServiceContext } from '#contexts/ServiceContext';

const Wrapper = styled.spa`
  ${({ script }) => script && getLongPrimer(script)}
  ${({ service }) => getSansRegular(service)}
  color: ${C_PEBBLE};
  margin-top: ${GEL_SPACING};
  display: inline-block;
`;

const OnDemandTvFooterTimestamp = ({ releaseDateTimeStamp }) => {
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
  return (
    <Wrapper script={script} service={service}>
      {formattedTimestamp}
    </Wrapper>
  );
};

OnDemandTvFooterTimestamp.propTypes = {
  releaseDateTimeStamp: number.isRequired,
};

export default OnDemandTvFooterTimestamp;
