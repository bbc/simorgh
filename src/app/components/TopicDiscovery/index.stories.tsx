import TopicDiscovery from '.';
import topicDiscoveryFixture from './fixtures';

const TopicDiscoveryStory = () => (
  <TopicDiscovery
    topicDiscovery={topicDiscoveryFixture}
    headingText="Conteúdo relacionado"
  />
);

export default {
  title: 'Components/TopicDiscovery',
  Component: TopicDiscoveryStory,
};

export const Default = TopicDiscoveryStory;

export const SingleTopic = () => (
  <TopicDiscovery
    topicDiscovery={{ topics: [topicDiscoveryFixture.topics[0]] }}
    headingText="Conteúdo relacionado"
  />
);

export const NoData = () => (
  <TopicDiscovery
    topicDiscovery={{ topics: [] }}
    headingText="Conteúdo relacionado"
  />
);
