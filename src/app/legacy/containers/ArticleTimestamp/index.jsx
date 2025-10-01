import React, { use } from 'react';
import Timestamp from '#psammead/psammead-timestamp-container/src';
// import { GridItemMedium, PopOutGridItemMedium } from '#components/Grid';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { formatDateNumeric } from './timeFormats';
import {
  isFirstRelative,
  // isLastRelative,
  formatType,
  isValidDateTime,
} from './helpers';
// import shouldDisplayLastUpdatedTimestamp from './shouldDisplayLastUpdatedTimestamp';

// const FirstPublishedTimestamp = Timestamp;
// const LastUpdatedTimestamp = Timestamp;

const ArticleTimestamp = ({
  firstPublished,
  lastPublished,
  // eslint-disable-next-line no-unused-vars
  popOut = true,
  // eslint-disable-next-line no-unused-vars
  minutesTolerance = 0,
  // eslint-disable-next-line no-unused-vars
  className = '',
  // eslint-disable-next-line no-unused-vars
  showReadTimeBelowTimestamp = false,
}) => {
  const {
    // articleTimestampPrefix,
    // articleTimestampSuffix,
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

  // const lastPublishedProps = {
  //   timestamp: lastPublished,
  //   format: formatType({
  //     lastPublished,
  //     firstPublished,
  //     datetimeLocale,
  //   }),
  //   isRelative: isLastRelative(lastPublished),
  //   prefix: articleTimestampPrefix,
  //   suffix: articleTimestampSuffix,
  // };

  // const GridWrapper = popOut ? PopOutGridItemMedium : GridItemMedium;

  // const displayLastUpdatedTimestamp = shouldDisplayLastUpdatedTimestamp({
  //   minutesTolerance,
  //   firstPublished,
  //   lastPublished,
  // });

  return (
    <Timestamp {...timestampProps} {...firstPublishedProps} />
    // <GridWrapper {...(className ? { className } : undefined)}>
    //   <FirstPublishedTimestamp
    //     {...timestampProps}
    //     {...firstPublishedProps}
    //     // // EXPERIMENT: Article Read Time
    //     {...(showReadTimeBelowTimestamp && { padding: false })}
    //   />
    //   {displayLastUpdatedTimestamp && (
    //     // Div has been used for No CSS formatting see #5554
    //     <div>
    //       <LastUpdatedTimestamp
    //         {...timestampProps}
    //         {...lastPublishedProps}
    //         // // EXPERIMENT: Article Read Time
    //         {...(showReadTimeBelowTimestamp && { padding: false })}
    //       />
    //     </div>
    //   )}
    // </GridWrapper>
  );
};

export default ArticleTimestamp;
