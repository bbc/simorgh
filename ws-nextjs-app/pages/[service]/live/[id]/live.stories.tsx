import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import liveFixture from '#data/pidgin/live/c7p765ynk9qt.json';
import liveFixtureWithLiveMedia from '#data/mundo/live/c7dkx155e626t.json';
import liveFixtureWithSportDataHeader from '#data/afrique/live/c7gk1vjglxn1t.json';
import liveFixtureWithPortraitVideoCarousel from '#data/mundo/live/cjnk1wrpkdk7t.json';
import postFixture from '#data/pidgin/posts/postFixtureCleaned.json';
import Live, { ComponentProps } from './LivePageLayout';

const mockLiveData =
  liveFixtureWithLiveMedia.data as ComponentProps['pageData'];

const mockPageData = {
  ...liveFixture.data,
  liveTextStream: {
    id: '3861CC0A9EA7434981EEE3FCE9880391',
    content: postFixture,
    contributors: 'Not a random dude',
  },
  someResponse: {
    block: 'Its a block',
  },
  metadata: { atiAnalytics: {} },
  mediaCollections: null,
};

const Component = ({ pageData }: ComponentProps) => (
  // @ts-expect-error partial data required for storybook
  <PageLayoutWrapper pageData={pageData} status={200}>
    <Live pageData={pageData} />
  </PageLayoutWrapper>
);

export default {
  title: 'Pages/Live Page',
  Component,
  parameters: { layout: 'fullscreen' },
};

export const Example = () => <Component pageData={mockPageData} />;
export const WithLiveStream = () => <Component pageData={mockLiveData} />;
export const WithSportDataHeader = () => (
  <Component
    // @ts-expect-error - TO DO - typify sport data
    pageData={liveFixtureWithSportDataHeader.data as ComponentProps['pageData']}
  />
);
export const WithPortraitVideoCarousel = () => (
  <Component
    pageData={
      liveFixtureWithPortraitVideoCarousel.data as ComponentProps['pageData']
    }
  />
);
