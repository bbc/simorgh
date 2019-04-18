import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import Timestamp from '.';

const defaultTimestamp = 1539969006000; // 19 October 2018
const noLeadingZeroTimestamp = 1530947227000; // 07 July 2018
const invalidData = '8640000000000001';

describe('Timestamp', () => {
  shouldMatchSnapshot(
    'should render without a leading zero on the day',
    <Timestamp
      timestamp={noLeadingZeroTimestamp}
      dateTimeFormat="YYYY-MM-DD"
      format="D MMMM YYYY"
    />,
  );
  shouldMatchSnapshot(
    'should render correctly',
    <Timestamp
      timestamp={defaultTimestamp}
      dateTimeFormat="YYYY-MM-DD"
      format="D MMMM YYYY"
    />,
  );
  shouldMatchSnapshot(
    'should handle invalid data',
    <Timestamp
      timestamp={invalidData}
      dateTimeFormat="YYYY-MM-DD"
      format="D MMMM YYYY"
    />,
  );
});
