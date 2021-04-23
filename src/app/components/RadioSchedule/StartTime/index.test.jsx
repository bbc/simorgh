import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import StartTime from './index';

const testUnixTimestamp = 1566914061212;

describe('StartTime', () => {
  shouldMatchSnapshot(
    'should render LTR correctly',
    <StartTime
      script={latin}
      service="news"
      timestamp={testUnixTimestamp}
      locale="en-gb"
      dir="ltr"
    />,
  );

  shouldMatchSnapshot(
    'should render RTL correctly',
    <StartTime
      script={arabic}
      service="persian"
      timestamp={testUnixTimestamp}
      locale="fa"
      dir="rtl"
    />,
  );
});
