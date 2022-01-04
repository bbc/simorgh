import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import StartTime from './index';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';

const testUnixTimestamp = 1566914061212;

describe('StartTime', () => {
  shouldMatchSnapshot(
    'should render LTR correctly',
    <ServiceContextProvider
      dir="ltr"
      locale="en-gb"
      service="news"
      script={latin}
    >
      <StartTime timestamp={testUnixTimestamp} />
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should render RTL correctly',
    <ServiceContextProvider
      dir="rtl"
      locale="fa"
      service="persian"
      script={arabic}
    >
      <StartTime timestamp={testUnixTimestamp} />
    </ServiceContextProvider>,
  );
});
