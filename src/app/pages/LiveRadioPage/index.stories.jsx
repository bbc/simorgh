import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import { LiveRadioPage } from '..';
import indonesia from './fixtureData/indonesia';
import korean from './fixtureData/korean';
import tigrinya from './fixtureData/tigrinya';
import afaanoromoo from './fixtureData/afaanoromoo';
import amharic from './fixtureData/amharic';
import withServicesDecorator from '#storybook/withServicesDecorator';

const liveRadioFixtures = {
  indonesia,
  korean,
  tigrinya,
  afaanoromoo,
  amharic,
};

const matchFixtures = service => ({
  params: {
    mediaId: 'liveradio',
    serviceId: {
      indonesia: 'bbc_indonesian_radio',
      korean: 'bbc_korean_radio',
      tigrinya: 'bbc_tigrinya_radio',
      afaanoromoo: 'bbc_afaanoromoo_radio',
      amharic: 'bbc_amharic_radio',
    }[service],
  },
});

const Component = (_, { service }) => {
  return (
    <BrowserRouter>
      <LiveRadioPage
        match={matchFixtures(service)}
        pageData={liveRadioFixtures[service]}
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
  title: 'Pages/Radio Page',
  decorators: [story => <WithTimeMachine>{story()}</WithTimeMachine>],
  parameters: {
    chromatic: {
      diffThreshold: 0.2,
      delay: 8000,
    },
  },
  decorators: [withServicesDecorator({ defaultService: 'indonesia' })],
};

export const Page = Component;
