import TopicDiscovery from '.';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { GREY_2 } from '../ThemeProvider/palette';

import {
  topicTagsFixture,
  multipleTopicsFixture,
  arabicTopicTagsFixture,
  arabicMultipleTopicsFixture,
} from './fixtures';

const ComponentWithContext = ({ topics, service }) => (
  <div css={{ backgroundColor: GREY_2 }}>
    <RequestContextProvider service={service} pageType="article" pathname="">
      <ServiceContextProvider service={service}>
        <TopicDiscovery topics={topics} />
      </ServiceContextProvider>
    </RequestContextProvider>
  </div>
);

const createFetchDecorator = fixture => Story => {
  // Mock global fetch to return fixture data
  const originalFetch = global.fetch;

  const mockFetch = async (url: RequestInfo | URL, init?: RequestInit) => {
    const urlString = typeof url === 'string' ? url : url.toString();
    if (urlString.includes('simorgh-bff')) {
      const urlObj = new URL(urlString);
      const topicId = urlObj.searchParams.get('id');
      const fixtureData = topicId ? fixture[topicId] : null;

      return {
        status: 200,
        json: async () => ({ data: fixtureData?.data || {} }),
      } as Response;
    }
    return originalFetch(urlString, init);
  };

  global.fetch = mockFetch as typeof fetch;

  return <Story />;
};

export const TopicDiscoveryStory = {
  render: () => (
    <ComponentWithContext topics={topicTagsFixture} service="portuguese" />
  ),
  decorators: [createFetchDecorator(multipleTopicsFixture)],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const RTLTopicDiscoveryStory = {
  render: () => (
    <ComponentWithContext topics={arabicTopicTagsFixture} service="arabic" />
  ),
  decorators: [createFetchDecorator(arabicMultipleTopicsFixture)],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const SingleTopic = {
  render: () => (
    <ComponentWithContext topics={[topicTagsFixture[0]]} service="portuguese" />
  ),
  decorators: [createFetchDecorator(multipleTopicsFixture)],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const NoData = {
  render: () => <ComponentWithContext topics={[]} service="portuguese" />,
  decorators: [createFetchDecorator(multipleTopicsFixture)],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default {
  title: 'Components/TopicDiscovery',
  Component: TopicDiscoveryStory,
};
