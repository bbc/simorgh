import { use } from 'react';
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

const ArticleTimestamp = ({
  firstPublished,
  lastPublished,
  popOut = true,
  minutesTolerance = 0,
  className = '',
  hasReadTime = false,
}) => {
  const {
    articleTimestampPrefix,
    articleTimestampSuffix,
    datetimeLocale,
    script,
    service,
    timezone,
    altCalendar,
  } = use(ServiceContext);

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
    <GridWrapper {...(className ? { className } : undefined)}>
      <Timestamp // First Published Timestamp
        {...timestampProps}
        {...firstPublishedProps}
        // TO DO
        {...(hasReadTime && { padding: false })}
      />
      {displayLastUpdatedTimestamp && (
        // Div has been used for No CSS formatting see #5554
        <div>
          <Timestamp // Last Published Timestamp
            {...timestampProps}
            {...lastPublishedProps}
            // TO DO
            {...(hasReadTime && { padding: false })}
          />
        </div>
      )}
    </GridWrapper>
  );
};

export default ArticleTimestamp;
