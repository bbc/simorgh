import React from 'react';
import { number } from 'prop-types';
import Timestamp from '../../components/Timestamp';
import relativeTime from './relativeTimestamp';
import {
  longNumeric,
  shortAlphaNumeric,
  isValidDateTime,
  formatUnixTimestamp,
  isTenHoursAgoOrLess,
} from './timestampUtilities';
import { GridItemConstrainedMedium } from '../../lib/styledGrid';

const humanReadable = ({ timestamp, makeRelative }) =>
  makeRelative
    ? relativeTime(timestamp)
    : formatUnixTimestamp(timestamp, shortAlphaNumeric);

const TimestampContainer = ({ lastPublished, firstPublished }) => {
  if (
    !isValidDateTime(new Date(lastPublished)) ||
    !isValidDateTime(new Date(firstPublished))
  ) {
    return null;
  }

  const firstPublishedString = humanReadable({
    timestamp: firstPublished,
    makeRelative:
      lastPublished === firstPublished && isTenHoursAgoOrLess(firstPublished),
  });

  const lastPublishedString = `Updated ${humanReadable({
    timestamp: lastPublished,
    makeRelative: isTenHoursAgoOrLess(lastPublished),
  })}`;

  return (
    <GridItemConstrainedMedium>
      <Timestamp datetime={formatUnixTimestamp(firstPublished, longNumeric)}>
        {firstPublishedString}
      </Timestamp>
      {lastPublished !== firstPublished ? (
        <Timestamp datetime={formatUnixTimestamp(lastPublished, longNumeric)}>
          {lastPublishedString}
        </Timestamp>
      ) : null}
    </GridItemConstrainedMedium>
  );
};

TimestampContainer.propTypes = {
  firstPublished: number.isRequired,
  lastPublished: number.isRequired,
};

export default TimestampContainer;
