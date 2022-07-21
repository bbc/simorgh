import React from 'react';
import { shouldMatchSnapshot } from '#legacy/psammead-test-helpers/src';
import { latin, arabic } from '#legacy/gel-foundations/src/scripts';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import StartTime from './index';

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
