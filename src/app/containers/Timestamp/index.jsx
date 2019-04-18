import React from 'react';
import { number, string, boolean } from 'prop-types';
import moment from 'moment-timezone';
import Timestamp from '../../components/Timestamp';
import relativeTime from './relativeTimestamp';
import {
  formatDateNumeric,
  formatDate,
  formatDateAndTime,
  formatUnixTimestamp,
} from './timestampUtilities';

// -- Fix date not showing if isRelevant is true

// 1. Move this into articles
const isToday = timestamp => {
  const today = moment(Date.now());
  return today.isSame(timestamp, 'day');
};

// 2. Move this into articles
const formatType = timestamp =>
  isToday(timestamp) ? formatDateAndTime : formatDate;


const TimestampContainer = ({ timestamp, prefix, isRelative, dateTimeFormat, suffix }) => {

  console.log('LOG', relativeTime(timestamp));
  return (
    <Timestamp datetime={formatUnixTimestamp(timestamp, formatDateNumeric)}>
      { prefix ? prefix : null }
      {
        isRelative ?
          relativeTime(timestamp)
          :
          formatUnixTimestamp(timestamp, formatType(timestamp))
      }
      { suffix ? suffix : null }
    </Timestamp>
  );
};

TimestampContainer.propTypes = {
  timestamp: number,
  dateTimeFormat: string,
  isRelative: boolean,
  locale: string,
  timezone: string,
  prefix: string,
  suffix: string,
};

TimestampContainer.defaultProps = { // should the below be required?
  locale: string,
  timezone: string,
  prefix: null,
  suffix: null,
};

export default TimestampContainer;

{/* <TimestampContainer -- props that are handling them
  timestamp="112121212121" -- timestamp
  dateTimeFormat="YYYY-MM-DD" -- dateTimeFormat
  format="D MMMM YYYY, HH:mm z" -- dateTimeFormat
  isRelative={false} -- isRelative
  local="en-GB" -- locale
  timezone="Europe/London"
  prefix="Updated"
  suffix={null}
/> */}

// RETURN
{/* <time datetime="2019-02-07">
Updated 7 February 2019 12:34 BST
</time> */}