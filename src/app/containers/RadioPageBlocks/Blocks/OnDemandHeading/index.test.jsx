import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import OnDemandHeading from '.';

describe('AudioPlayer blocks OnDemandHeading', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <ServiceContextProvider service="news">
      <OnDemandHeading
        brandTitle="Dunia Pagi Ini"
        releaseDateTimeStamp={1587945600000}
        uuid="uuid"
        idAttr="idAttr"
      />
    </ServiceContextProvider>,
  );
});
