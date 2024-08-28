import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import withServicesDecorator from '#storybook/withServicesDecorator';
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

const matchFixtures = (service: 'afrique' | 'pashto') => ({
  params: {
    serviceId: {
      afrique: 'bbc_afrique_tv',
      pashto: 'bbc_pashto_tv',
    }[service],
  },
});

const Component = (
  _: unknown,
  { service }: { service: 'afrique' | 'pashto' },
) => {
  return (
    <BrowserRouter>
      <OnDemandTvPage
        match={matchFixtures(service)}
        pageData={onDemandTvFixtures[service]}
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
    withServicesDecorator({ defaultService: 'pashto' }),
    (story: () => unknown) => (
      // @ts-expect-error use default params
      <WithTimeMachine>{story()}</WithTimeMachine>
    ),
  ],
};

export const Page = Component;
