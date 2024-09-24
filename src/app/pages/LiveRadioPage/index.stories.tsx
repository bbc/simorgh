import React from 'react';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
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
  const serviceToUse =
    service === 'news' ? 'indonesia' : (service as ValidServices);

  const fixtureData = liveRadioFixtures[serviceToUse];

  const formattedFixtureData = {
    ...fixtureData,
    mediaBlock: [
      {
        type: 'liveRadio',
        model: [
          {
            text: fixtureData?.heading,
            type: 'heading',
          },
          {
            text: fixtureData?.summary,
            type: 'paragraph',
          },
          {
            id: 'liveradio',
            subType: 'primary',
            format: 'audio',
            externalId: fixtureData?.masterBrand,
            duration: 'PT0S',
            caption: '',
            embedding: false,
            available: true,
            live: true,
            type: 'version',
          },
        ],
      },
    ],
  };

  return (
    <LiveRadioPage
      match={matchFixtures(serviceToUse)}
      pageData={formattedFixtureData}
      status={200}
      service={serviceToUse}
      loading={false}
      error=""
      pageType={MEDIA_PAGE}
    />
  );
};

export default {
  Component,
  title: 'Pages/Radio Page',
  parameters: {
    chromatic: {
      diffThreshold: 0.2,
      delay: 8000,
      pauseAnimationAtEnd: false,
    },
  },
};

export const Page = Component;
