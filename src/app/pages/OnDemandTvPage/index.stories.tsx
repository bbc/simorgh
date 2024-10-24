import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import { StoryArgs, StoryProps } from '#app/models/types/storybook';
import { Services } from '#app/models/types/global';
import { OnDemandTvPage } from '..';
import afrique from './fixtureData/afrique.json';
import pashto from './fixtureData/pashto.json';
import { OnDemandTVProps } from './OnDemandTvPage';

const onDemandTvFixtures: {
  pashto: OnDemandTVProps['pageData'];
  afrique: OnDemandTVProps['pageData'];
} = {
  // @ts-expect-error ignore metadata.type error in Storybook
  pashto,
  // @ts-expect-error ignore metadata.type error in Storybook
  afrique,
};

const matchFixtures = (service: Services) => ({
  params: {
    // @ts-expect-error partial data for testing
    serviceId: {
      afrique: 'bbc_afrique_tv',
      pashto: 'bbc_pashto_tv',
    }[service],
  },
});

const Component = ({ service }: StoryProps) => {
  return (
    <BrowserRouter>
      <OnDemandTvPage
        match={matchFixtures(service)}
        // @ts-expect-error partial data for testing purposes
        pageData={onDemandTvFixtures[service] || afrique}
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
  title: 'Pages/OnDemand TV Page',
  decorators: [
    (story: () => unknown) => (
      // @ts-expect-error use default params
      <WithTimeMachine>{story()}</WithTimeMachine>
    ),
  ],
};

export const Example = {
  render: (_: StoryArgs, { service, variant }: StoryProps) => (
    <Component service={service} variant={variant} />
  ),
  parameters: { chromatic: { disableSnapshot: true } },
};

// This story is for chromatic testing purposes only
export const Test = {
  render: (_: StoryArgs, { variant }: StoryProps) => (
    <Component service="pashto" variant={variant} />
  ),
  tags: ['!dev'],
};
