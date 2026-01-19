import {
  render,
  screen,
  act,
} from '#app/components/react-testing-library-with-providers';
import { TopicsData } from '#app/lib/config/fixtures/types';
import TopicsIndexPage from './TopicsIndexPage';

const validTopicsData: TopicsData = {
  headline: 'Sujets',
  topics: [
    {
      topicName: 'Topic One',
      topicUrl: '/service/topics/id-1',
      id: 'id-1',
    },
    {
      topicName: 'Topic Two',
      topicUrl: '/service/topics/id-2',
      id: 'id-2',
    },
  ],
};

describe('TopicsIndexPage', () => {
  it('renders topics page for valid service and matches snapshot', async () => {
    await act(async () => {
      render(
        <TopicsIndexPage service="afrique" topicsData={validTopicsData} />,
      );
    });
    expect(screen.getByText(validTopicsData.headline)).toBeInTheDocument();
    validTopicsData.topics.forEach(topic => {
      expect(screen.getByText(topic.topicName)).toBeInTheDocument();
    });
  });
  it('parses valid topic data and exposes all required fields', () => {
    render(<TopicsIndexPage service="afrique" topicsData={validTopicsData} />);
    validTopicsData.topics.forEach(topic => {
      expect(screen.getByText(topic.topicName)).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: topic.topicName }),
      ).toHaveAttribute('href', topic.topicUrl);
    });
  });
});
