import {
  render,
  screen,
  act,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import useUASRecentActivity from '#app/hooks/useUASRecentActivity';
import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import MyNewsPage from '.';

jest.mock('#app/hooks/useUASRecentActivity');

const mockUseRecentActivity = useUASRecentActivity as jest.MockedFunction<
  typeof useUASRecentActivity
>;

const renderOptions = {
  service: 'hindi' as const,
  toggles: { uasPersonalization: { enabled: true, value: 'hindi' } },
  idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
};

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
    mockUseRecentActivity.mockReturnValue({
      savedArticles: [],
      total: 0,
      isLoading: false,
      error: null,
    });
  });

  // TODO: TBC
  it.skip('should render loading state initially', async () => {
    mockUseRecentActivity.mockReturnValue({
      savedArticles: [],
      total: 0,
      isLoading: true,
      error: null,
    });

    await act(async () => {
      render(<MyNewsPage />, renderOptions);
    });

    expect(screen.getByText('Loading your articles...')).toBeInTheDocument();
  });

  it('should render saved articles after fetching', async () => {
    mockUseRecentActivity.mockReturnValue({
      savedArticles: mockSavedArticles,
      total: 2,
      isLoading: false,
      error: null,
    });

    await act(async () => {
      render(<MyNewsPage />, renderOptions);
    });

    await waitFor(() => {
      expect(screen.getByText('Saved Article One')).toBeInTheDocument();
      expect(screen.getByText('Saved Article Two')).toBeInTheDocument();
    });
  });

  it('should display empty state when no articles', async () => {
    await act(async () => {
      render(<MyNewsPage />, renderOptions);
    });

    await waitFor(() => {
      expect(
        screen.getByText("You haven't saved any articles yet"),
      ).toBeInTheDocument();
    });
  });

  it('should display error state when API fails', async () => {
    mockUseRecentActivity.mockReturnValue({
      savedArticles: [],
      total: 0,
      isLoading: false,
      error: new Error('Failed to load articles'),
    });

    await act(async () => {
      render(<MyNewsPage />, renderOptions);
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          'This content does not seem to be working. Please try again later.',
        ),
      ).toBeInTheDocument();
    });
  });

  it('should render pagination when pageCount > 1', async () => {
    mockUseRecentActivity.mockReturnValue({
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
      isLoading: false,
      error: null,
    });

    await act(async () => {
      render(<MyNewsPage />, renderOptions);
    });

    await waitFor(() => {
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: '2' })).toBeInTheDocument();
    });
  });

  it('should call useUASRecentActivity with correct pagination params', async () => {
    await act(async () => {
      render(<MyNewsPage />, renderOptions);
    });

    expect(mockUseRecentActivity).toHaveBeenCalledWith(
      expect.objectContaining({
        itemsPerPage: 10,
        startIndex: 0,
      }),
    );
  });
});
