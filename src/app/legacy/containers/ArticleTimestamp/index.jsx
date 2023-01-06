import React, { useContext } from 'react';
import { number, bool, string } from 'prop-types';
import Timestamp from '#psammead/psammead-timestamp-container/src';
import { GridItemMedium, PopOutGridItemMedium } from '#components/Grid';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { formatDateNumeric } from './timeFormats';
import {
  isFirstRelative,
  isLastRelative,
  formatType,
  isValidDateTime,
} from './helpers';
import shouldDisplayLastUpdatedTimestamp from './shouldDisplayLastUpdatedTimestamp';

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
    articleTimestampSuffix,
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
    format: formatType({ firstPublished, datetimeLocale }),
    isRelative: isFirstRelative(firstPublished, lastPublished),
  };

  const lastPublishedProps = {
    timestamp: lastPublished,
    format: formatType({
      lastPublished,
      firstPublished,
      datetimeLocale,
    }),
    isRelative: isLastRelative(lastPublished),
    prefix: articleTimestampPrefix,
    suffix: articleTimestampSuffix,
  };

  const GridWrapper = popOut ? PopOutGridItemMedium : GridItemMedium;

  const displayLastUpdatedTimestamp = shouldDisplayLastUpdatedTimestamp({
    minutesTolerance,
    firstPublished,
    lastPublished,
  });

  return (
    <GridWrapper className={className}>
      <FirstPublishedTimestamp {...timestampProps} {...firstPublishedProps} />
      {displayLastUpdatedTimestamp && (
        // Div has been used for No CSS formatting see #5554
        <div>
          <LastUpdatedTimestamp {...timestampProps} {...lastPublishedProps} />
        </div>
      )}
    </GridWrapper>
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
