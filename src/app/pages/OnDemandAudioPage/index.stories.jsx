import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import { OnDemandAudioPage } from '..';
import indonesia from './fixtureData/indonesia';
import pashto from './fixtureData/pashto';

const onDemandRadioFixtures = {
  indonesia,
  pashto,
};

const matchFixtures = service => ({
  params: {
    mediaId: 'liveradio',
    serviceId: {
      indonesia: 'bbc_indonesian_radio',
      pashto: 'bbc_pashto_radio',
    }[service],
  },
});

const Component = (_, { service }) => {
  return (
    <BrowserRouter>
      <OnDemandAudioPage
        match={matchFixtures(service)}
        pageData={onDemandRadioFixtures[service]}
        status={200}
        service={service}
        isAmp={false}
        loading={false}
        error=""
        pageType={MEDIA_PAGE}
      />
    </BrowserRouter>
  );
};

export default {
  Component,
  title: 'Pages/OnDemand Radio Page',
  // decorators: [story => <WithTimeMachine>{story()}</WithTimeMachine>],
  parameters: {
    chromatic: {
      diffThreshold: 0.2,
    },
  },
};

export const Page = Component;
