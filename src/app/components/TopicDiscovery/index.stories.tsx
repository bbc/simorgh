import TopicDiscovery from '.';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { GREY_2 } from '../ThemeProvider/palette';

import { topicTagsFixture } from './fixtures';

const ComponentWithContext = ({ topics }) => (
  <div css={{ backgroundColor: GREY_2 }}>
    <RequestContextProvider service="portuguese" pageType="article" pathname="">
      <ServiceContextProvider service="portuguese">
        <TopicDiscovery topics={topics} />
      </ServiceContextProvider>
    </RequestContextProvider>
  </div>
);

const TopicDiscoveryStory = {
  render: () => <ComponentWithContext topics={topicTagsFixture} />,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Default = {
  render: () => <ComponentWithContext topics={topicTagsFixture} />,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const SingleTopic = {
  render: () => <ComponentWithContext topics={[topicTagsFixture[0]]} />,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const NoData = {
  render: () => <ComponentWithContext topics={[]} />,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default {
  title: 'Components/TopicDiscovery',
  Component: TopicDiscoveryStory,
};
