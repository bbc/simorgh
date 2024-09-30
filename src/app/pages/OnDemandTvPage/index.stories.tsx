import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import withServicesDecorator from '#storybook/withServicesDecorator';
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

const Component = ({ service, text, longText }: StoryProps) => {
  // @ts-expect-error partial data for testing purposes
  let pageData = onDemandTvFixtures[service];

  if (!pageData) {
    pageData = {
      ...afrique,
      brandTitle: text,
      episodeTitle: '',
      shortSynopsis: longText,
      imageUrl:
        'ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/36D1/production/_127933041__63970643_bbc-news-world-service-logo-nc.png',
    };
  }

  return (
    <BrowserRouter>
      <OnDemandTvPage
        match={matchFixtures(service)}
        pageData={pageData}
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
    withServicesDecorator(),
    (story: () => unknown) => (
      // @ts-expect-error use default params
      <WithTimeMachine>{story()}</WithTimeMachine>
    ),
  ],
};

export const Example = {
  render: (_: StoryArgs, { service, variant, text, longText }: StoryProps) => (
    <Component
      service={service}
      variant={variant}
      text={text}
      longText={longText}
    />
  ),
  parameters: { chromatic: { disableSnapshot: true } },
};

// This story is for chromatic testing purposes only
export const Test = {
  render: (_: StoryArgs, { variant }: StoryProps) => (
    <Component service="pashto" variant={variant} />
  ),
  tags: ['test'],
};
