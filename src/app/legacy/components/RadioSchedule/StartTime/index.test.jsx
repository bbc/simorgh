import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import arabic from '../../../../components/ThemeProvider/fontScripts/arabic';
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
