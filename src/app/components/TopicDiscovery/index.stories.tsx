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
};
