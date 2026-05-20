import WithTimeMachine from '#testHelpers/withTimeMachine';
import { TV_PAGE } from '#app/routes/utils/pageTypes';
import { StoryArgs, StoryProps } from '#app/models/types/storybook';
import { data as afrique } from '#data/afrique/bbc_afrique_tv/tv_programmes/w13xttmz.json';
import { data as pashto } from '#data/pashto/bbc_pashto_tv/tv_programmes/w13xttn4.json';
import _OnDemandTvPage, { OnDemandTVProps } from './OnDemandTvPage';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import withMediaError from '#app/lib/utilities/episodeAvailability/withMediaError';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';

const OnDemandTvPage = withMediaError(_OnDemandTvPage);

const onDemandTvFixtures: {
  pashto: OnDemandTVProps['pageData'];
  afrique: OnDemandTVProps['pageData'];
} = {
  // @ts-expect-error ignore metadata.type error in Storybook
  pashto,
  // @ts-expect-error ignore metadata.type error in Storybook
  afrique,
};

const Component = ({ service, isLite }: StoryProps) => {
  const pageData = onDemandTvFixtures[service] || afrique;

  return (
    <ServiceContextProvider service={service}>
      <PageLayoutWrapper pageData={pageData} status={200}>
        <OnDemandTvPage
          pageData={pageData}
          service={service}
          loading={false}
          error=""
          pageType={TV_PAGE}
          isLite={isLite}
        />
      </PageLayoutWrapper>
    </ServiceContextProvider>
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
  parameters: {
    layout: 'fullscreen',
  },
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
