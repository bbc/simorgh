import {
  render,
  screen,
  act,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import * as getRecentActivityModule from '#app/lib/uasApi/getRecentActivity';
import MyNewsPage from './MyNewsPage';

jest.mock('#app/lib/uasApi/getRecentActivity');
jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { service: 'hindi' },
    push: jest.fn(),
  }),
}));

const mockGetRecentActivity =
  getRecentActivityModule.default as jest.MockedFunction<
    typeof getRecentActivityModule.default
  >;

const mockSavedArticles = [
  {
    id: 'id-1',
    title: 'Saved Article One',
    link: '/articles/id-1',
    imageUrl: '',
    imageAlt: '',
    type: 'article',
    description: 'hindi',
  },
  {
    id: 'id-2',
    title: 'Saved Article Two',
    link: '/articles/id-2',
    imageUrl: '',
    imageAlt: '',
    type: 'article',
    description: 'hindi',
  },
];

describe('MyNewsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', async () => {
    mockGetRecentActivity.mockImplementationOnce(
      () =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve({
              savedArticles: mockSavedArticles,
              total: 2,
              itemsPerPage: 10,
              startIndex: 0,
            });
          }, 100);
        }),
    );

    await act(async () => {
      render(<MyNewsPage />);
    });

    expect(screen.getByText('Loading your articles...')).toBeInTheDocument();
  });

  it('should render saved articles after fetching', async () => {
    mockGetRecentActivity.mockResolvedValueOnce({
      savedArticles: mockSavedArticles,
      total: 2,
      itemsPerPage: 10,
      startIndex: 0,
    });

    await act(async () => {
      render(<MyNewsPage />);
    });

    await waitFor(() => {
      expect(screen.getByText('Saved Article One')).toBeInTheDocument();
      expect(screen.getByText('Saved Article Two')).toBeInTheDocument();
    });
  });

  it('should display empty state when no articles', async () => {
    mockGetRecentActivity.mockResolvedValueOnce({
      savedArticles: [],
      total: 0,
      itemsPerPage: 10,
      startIndex: 0,
    });

    await act(async () => {
      render(<MyNewsPage />);
    });

    await waitFor(() => {
      expect(screen.getByText('No saved articles yet')).toBeInTheDocument();
    });
  });

  it('should display error state when API fails', async () => {
    mockGetRecentActivity.mockRejectedValueOnce(
      new Error('Failed to load articles'),
    );

    await act(async () => {
      render(<MyNewsPage />);
    });

    await waitFor(() => {
      expect(
        screen.getByText('Error loading articles: Failed to load articles'),
      ).toBeInTheDocument();
    });
  });

  it('should render pagination when pageCount > 1', async () => {
    mockGetRecentActivity.mockResolvedValueOnce({
      savedArticles: Array.from({ length: 25 }, (_, i) => ({
        id: `id-${i}`,
        title: `Article ${i}`,
        link: `/articles/id-${i}`,
        imageUrl: '',
        imageAlt: '',
        type: 'article',
        description: 'hindi',
      })),
      total: 25,
      itemsPerPage: 10,
      startIndex: 0,
    });

    await act(async () => {
      render(<MyNewsPage />);
    });

    await waitFor(() => {
      // Check for pagination navigation element
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      // Check that page 2 link exists
      expect(screen.getByRole('link', { name: '2' })).toBeInTheDocument();
    });
  });

  it('should fetch data with correct pagination params', async () => {
    mockGetRecentActivity.mockResolvedValueOnce({
      savedArticles: mockSavedArticles,
      total: 2,
      itemsPerPage: 10,
      startIndex: 0,
    });

    await act(async () => {
      render(<MyNewsPage />);
    });

    await waitFor(() => {
      expect(mockGetRecentActivity).toHaveBeenCalledWith({
        itemsPerPage: 10,
        startIndex: 0,
      });
    });
  });
});
