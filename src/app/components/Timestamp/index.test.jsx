import React from 'react';
import { isNull, shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import Timestamp from './index';

const timestamp = 1539969006000; // 19 October 2018
const noLeadingZeroTimestamp = 1530947227000; // 07 July 2018
const invalidTimestamp = 8640000000000001; // A day holds 86,400,000 milliseconds - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Description

describe('Timestamp', () => {
  describe('with no data', () => {
    isNull('should return null', <Timestamp />);
  });
  shouldMatchSnapshot(
    'should render without a leading zero on the day',
    <Timestamp timestamp={noLeadingZeroTimestamp} />,
  );
  shouldMatchSnapshot(
    'should render correctly',
    <Timestamp timestamp={timestamp} />,
  );
  shouldMatchSnapshot(
    'should handle an invalid timestamp',
    <Timestamp timestamp={invalidTimestamp} />,
  );
});
