import TopicDiscovery from '.';

import { topicTagsFixture } from './fixtures';

const TopicDiscoveryStory = () => <TopicDiscovery topics={topicTagsFixture} />;

export default {
  title: 'Components/TopicDiscovery',
  Component: TopicDiscoveryStory,
};

export const Default = TopicDiscoveryStory;

export const SingleTopic = () => (
  <TopicDiscovery topics={[topicTagsFixture[0]]} />
);

export const NoData = () => <TopicDiscovery topics={[]} />;
