import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import StartTime from './index';

const testUnixTimestamp = 1566914061212;

describe('StartTime', () => {
  shouldMatchSnapshot(
    'should render LTR correctly',
    <ServiceContextProvider
      script={latin}
      service="news"
      locale="en-gb"
      dir="ltr"
      timezone="Europe/London"
    >
      <StartTime timestamp={testUnixTimestamp} />
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should render RTL correctly',
    <ServiceContextProvider
      script={arabic}
      service="persian"
      locale="fa"
      dir="rtl"
      timezone="GMT"
    >
      <StartTime timestamp={testUnixTimestamp} />
    </ServiceContextProvider>,
  );
});
