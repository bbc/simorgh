import React from 'react';
import { isNull, shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import Timestamp from './index';

const timestamp = 1539969006; // 19 October 2018
const noLeadingZeroTimestamp = 1530947227; // 07 July 2018

describe('Timestamp', () => {
  describe('with no data', () => {
    isNull('should return null', <Timestamp />);
  });
  shouldMatchSnapshot(
    'should render correctly',
    <Timestamp timestamp={timestamp} />,
  );
  shouldMatchSnapshot(
    'should render without a leading zero on the day',
    <Timestamp timestamp={noLeadingZeroTimestamp} />,
  );
});
