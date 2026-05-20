import {
  act,
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import { Summary } from '#app/models/types/curationData';
import { Services } from '#app/models/types/global';
import TopicsIndexPage from './TopicsIndexPage';

const validTopicsData = {
  service: 'afrique' as Services,
  pageData: {
    headline: 'Tous les sujets',
    summaries: [
      {
        id: 'id-1',
        title: 'Topic One',
        link: '/service/topics/id-1',
      } as Summary,
      {
        id: 'id-2',
        title: 'Topic Two',
        link: '/service/topics/id-2',
      } as Summary,
    ],
    totalItems: 2,
    metadata: {
      type: 'topicsIndex',
    },
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
    validTopicsData.pageData.summaries.forEach(summary => {
      expect(screen.getByText(summary.title)).toBeInTheDocument();
    });
  });
  it('parses valid topic data and exposes all required fields', async () => {
    await act(async () => {
      render(<TopicsIndexPage {...validTopicsData} />);
    });
    validTopicsData.pageData.summaries.forEach(summary => {
      expect(screen.getByText(summary.title)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: summary.title })).toHaveAttribute(
        'href',
        summary.link,
      );
    });
  });
});
