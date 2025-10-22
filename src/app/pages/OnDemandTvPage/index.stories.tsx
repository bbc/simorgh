import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import { TV_PAGE } from '#app/routes/utils/pageTypes';
import { StoryArgs, StoryProps } from '#app/models/types/storybook';
import { Services } from '#app/models/types/global';
import { data as afrique } from '#data/afrique/bbc_afrique_tv/tv_programmes/w13xttmz.json';
import { data as pashto } from '#data/pashto/bbc_pashto_tv/tv_programmes/w13xttn4.json';
import { OnDemandTvPage } from '..';
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

const Component = ({ service, isLite }: StoryProps) => {
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
        pageType={TV_PAGE}
        isLite={isLite}
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
      (<WithTimeMachine>{story()}</WithTimeMachine>)
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

// This story is for chromatic testing purposes only
export const TestLite = {
  render: (_: StoryArgs, { variant }: StoryProps) => (
    <Component service="pashto" variant={variant} isLite />
  ),
  tags: ['!dev'],
};
