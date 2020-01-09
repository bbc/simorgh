import React, { useContext } from 'react';
import styled from 'styled-components';
import { number, bool } from 'prop-types';
import { GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import Timestamp from '@bbc/psammead-timestamp-container';
import {
  PopOutGridItemMedium,
  GridItemConstrainedMedium,
} from '#lib/styledGrid';
import { ServiceContext } from '#contexts/ServiceContext';
import { formatDateNumeric } from './timeFormats';
import {
  isFirstRelative,
  isLastRelative,
  formatType,
  isValidDateTime,
} from './helpers';

const ArticleTimestamp = ({ firstPublished, lastPublished, popOut }) => {
  const {
    articleTimestampPrefix,
    datetimeLocale,
    script,
    service,
    timezone,
    altCalendar,
  } = useContext(ServiceContext);

  if (!isValidDateTime(firstPublished) || !isValidDateTime(lastPublished)) {
    return null;
  }

  const timestampProps = {
    dateTimeFormat: formatDateNumeric,
    script,
    locale: datetimeLocale,
    service,
    timezone,
    altCalendar,
  };
  const firstPublishedProps = {
    timestamp: firstPublished,
    format: formatType({ firstPublished }),
    isRelative: isFirstRelative(firstPublished, lastPublished),
  };

  const lastPublishedProps = {
    timestamp: lastPublished,
    format: formatType({ lastPublished, firstPublished }),
    isRelative: isLastRelative(lastPublished),
    prefix: articleTimestampPrefix,
  };

  const Wrapper = popOut ? PopOutGridItemMedium : GridItemConstrainedMedium;

  return (
    <Wrapper>
      <Timestamp {...timestampProps} {...firstPublishedProps} />
      {firstPublished !== lastPublished && (
        <SecondTimestampWrapper>
          <Timestamp {...timestampProps} {...lastPublishedProps} />
        </SecondTimestampWrapper>
      )}
    </Wrapper>
  );
};

const SecondTimestampWrapper = styled.div`
  padding-bottom: ${GEL_SPACING_DBL};
`;

ArticleTimestamp.propTypes = {
  firstPublished: number.isRequired,
  lastPublished: number.isRequired,
  popOut: bool,
};

ArticleTimestamp.defaultProps = {
  popOut: true,
};

export default ArticleTimestamp;
