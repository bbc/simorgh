import React, { useContext } from 'react';
import { number, bool, string } from 'prop-types';
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
  isSameDay,
} from './helpers';

const FirstPublishedTimestamp = Timestamp;
const LastUpdatedTimestamp = Timestamp;

const ArticleTimestamp = ({
  firstPublished,
  lastPublished,
  popOut,
  minutesTolerance,
  className,
}) => {
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

  const timeDifferenceMinutes = (lastPublished - firstPublished) / 1000 / 60;

  const publishedAndUpdatedOnSameDay = isSameDay(firstPublished, lastPublished);

  const updatedLessThanTenHoursAgo = isLastRelative(lastPublished);

  const publishedAndUpdatedOnSameDayOverTenHoursAgo =
    publishedAndUpdatedOnSameDay && !updatedLessThanTenHoursAgo;

  const showLastUpdatedTimeStamp =
    !publishedAndUpdatedOnSameDayOverTenHoursAgo &&
    timeDifferenceMinutes > minutesTolerance;

  return (
    <Wrapper className={className}>
      <FirstPublishedTimestamp {...timestampProps} {...firstPublishedProps} />
      {showLastUpdatedTimeStamp && (
        <LastUpdatedTimestamp {...timestampProps} {...lastPublishedProps} />
      )}
    </Wrapper>
  );
};

ArticleTimestamp.propTypes = {
  firstPublished: number.isRequired,
  lastPublished: number.isRequired,
  popOut: bool,
  minutesTolerance: number,
  // eslint-disable-next-line react/require-default-props
  className: string,
};

ArticleTimestamp.defaultProps = {
  popOut: true,
  minutesTolerance: 0,
};

export default ArticleTimestamp;
