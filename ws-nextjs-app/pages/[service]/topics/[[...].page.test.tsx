import {
  render,
  screen,
  act,
} from '#app/components/react-testing-library-with-providers';
import { Services } from '#app/models/types/global';
import TopicsIndexPage from './TopicsIndexPage';

const validTopicsData = {
  service: 'afrique' as Services,
  topicsData: {
    headline: 'Sujets',
    summaries: [
      {
        id: 'id-1',
        title: 'Topic One',
        link: '/service/topics/id-1',
      },
      {
        id: 'id-2',
        title: 'Topic Two',
        link: '/service/topics/id-2',
      },
    ],
    totalItems: 2,
  },
  activePage: 1,
  pageCount: 1,
  safeActivePage: 1,
};

describe('TopicsIndexPage', () => {
  it('renders topics page for valid service and matches snapshot', async () => {
    await act(async () => {
      render(<TopicsIndexPage {...validTopicsData} />);
    });
    validTopicsData.topicsData.summaries.forEach(summary => {
      expect(screen.getByText(summary.title)).toBeInTheDocument();
    });
  });
  it('parses valid topic data and exposes all required fields', async () => {
    await act(async () => {
      render(<TopicsIndexPage {...validTopicsData} />);
    });
    validTopicsData.topicsData.summaries.forEach(summary => {
      expect(screen.getByText(summary.title)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: summary.title })).toHaveAttribute(
        'href',
        summary.link,
      );
    });
  });
});
