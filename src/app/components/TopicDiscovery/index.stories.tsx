import TopicDiscovery from '.';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { GREY_2 } from '../ThemeProvider/palette';

import { topicTagsFixture } from './fixtures';

const ComponentWithContext = ({ topics }) => (
  <div css={{ backgroundColor: GREY_2 }}>
    <ServiceContextProvider service="portuguese">
      <TopicDiscovery topics={topics} />
    </ServiceContextProvider>
  </div>
);

const TopicDiscoveryStory = () => (
  <ComponentWithContext topics={topicTagsFixture} />
);

export const Default = TopicDiscoveryStory;

export const SingleTopic = () => (
  <ComponentWithContext topics={[topicTagsFixture[0]]} />
);

export const NoData = () => <ComponentWithContext topics={[]} />;

export default {
  title: 'Components/TopicDiscovery',
  Component: TopicDiscoveryStory,
};
