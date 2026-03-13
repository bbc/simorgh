import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import { StoryProps, StoryArgs } from '#app/models/types/storybook';
import { data as liveTvFixture } from '#data/dari/watch/bbc_afghan_tv/live.json';
import { LIVE_TV_PAGE } from '#app/routes/utils/pageTypes';
import LiveTvLayout from './LiveTvPageLayout';

const Component = ({ service }: StoryProps) => (
  // @ts-expect-error partial data required for storybook
  (<PageLayoutWrapper pageData={liveTvFixture} status={200}>
    <LiveTvLayout
      pageType={LIVE_TV_PAGE}
      service={service}
      // @ts-expect-error partial data required for storybook
      pageData={liveTvFixture}
      pathname=""
      status={200}
      timeOnServer={0}
    />
  </PageLayoutWrapper>)
);

export default {
  title: 'Pages/Live TV Page',
  Component,
};

export const Example = (_: StoryArgs, { service, variant }: StoryProps) => (
  <Component service={service} variant={variant} />
);
