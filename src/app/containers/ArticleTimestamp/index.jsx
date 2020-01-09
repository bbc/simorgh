import React, { useContext } from 'react';
import { number } from 'prop-types';
import Timestamp from '@bbc/psammead-timestamp-container';
import Grid, { ArticlePageGrid } from '#app/components/Grid';
import { ServiceContext } from '#contexts/ServiceContext';
import { formatDateNumeric } from './timeFormats';
import { formatType, isFirstRelative, isLastRelative, isValidDateTime } from './helpers';

const ArticleTimestamp = ({ firstPublished, lastPublished }) => {
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
  /*
   *   @supports(display: grid) {
   *   @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
   *   max-height: 0;
   *   padding-top: 0.25rem;
   *  }
  }
   */
  return (
    <ArticlePageGrid>
      <Grid
        item
        columns={{
          group0: 6,
          group1: 6,
          group2: 4,
          group3: 5,
          group4: 4,
          group5: 8,
        }}
        margins={{
          group0: true,
          group1: true,
          group2: true,
          group3: true,
          group4: false,
          group5: false,
        }}
      >
        <Timestamp {...timestampProps} {...firstPublishedProps} />
        {firstPublished !== lastPublished && (
          <Timestamp {...timestampProps} {...lastPublishedProps} />
        )}
      </Grid>
    </ArticlePageGrid>
  );
};

ArticleTimestamp.propTypes = {
  firstPublished: number.isRequired,
  lastPublished: number.isRequired,
};

export default ArticleTimestamp;
