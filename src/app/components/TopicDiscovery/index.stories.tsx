import TopicDiscovery from '.';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';

import { topicTagsFixture } from './fixtures';

const ComponentWithContext = ({ topics }) => (
  <ServiceContextProvider service="portuguese">
    <TopicDiscovery topics={topics} />
  </ServiceContextProvider>
);

const TopicDiscoveryStory = () => (
  <ComponentWithContext topics={topicTagsFixture} />
);

export default {
  title: 'Components/TopicDiscovery',
  Component: TopicDiscoveryStory,
};

export const Default = TopicDiscoveryStory;

export const SingleTopic = () => (
  <ComponentWithContext topics={[topicTagsFixture[0]]} />
);

export const NoData = () => <ComponentWithContext topics={[]} />;
