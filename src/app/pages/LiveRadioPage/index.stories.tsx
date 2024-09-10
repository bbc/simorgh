import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import withServicesDecorator from '#storybook/withServicesDecorator';
import { Services } from '#app/models/types/global';
import { StoryArgs, StoryProps } from '#app/models/types/storybook';
import { LiveRadioPage } from '..';
import indonesia from './fixtureData/indonesia.json';
import korean from './fixtureData/korean.json';
import tigrinya from './fixtureData/tigrinya.json';
import afaanoromoo from './fixtureData/afaanoromoo.json';
import amharic from './fixtureData/amharic.json';

const liveRadioFixtures = {
  indonesia,
  korean,
  tigrinya,
  afaanoromoo,
  amharic,
};

type ValidServices = Extract<
  Services,
  'indonesia' | 'korean' | 'tigrinya' | 'afaanoromoo' | 'amharic'
>;

const matchFixtures = (service: ValidServices) => ({
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

const Component = (_: StoryArgs, { service }: StoryProps) => {
  return (
    <BrowserRouter>
      <LiveRadioPage
        match={matchFixtures(service as ValidServices)}
        pageData={liveRadioFixtures[service as ValidServices]}
        status={200}
        service={service}
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
  decorators: [
    // @ts-expect-error - WithTimeMachine not typed
    story => <WithTimeMachine>{story()}</WithTimeMachine>,
    withServicesDecorator({ defaultService: 'indonesia' }),
  ],
  parameters: {
    chromatic: {
      diffThreshold: 0.2,
      delay: 8000,
      pauseAnimationAtEnd: false,
    },
  },
};

export const Page = Component;
