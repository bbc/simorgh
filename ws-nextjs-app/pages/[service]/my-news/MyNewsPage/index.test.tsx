import {
  render,
  screen,
  act,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import mockMatchMedia from '#testHelpers/mockMatchMedia';
import useUASRecentActivity from '#app/hooks/useUASRecentActivity';
import useUASFollowedTopics from '#app/hooks/useUASFollowedTopics';
import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import { service as hindiServiceConfig } from '#app/lib/config/services/hindi';
import MyNewsPage from '.';

const myNewsTranslations = hindiServiceConfig.default.translations.myNews;

if (!myNewsTranslations) {
  throw new Error(
    'Hindi config must include translations.myNews for MyNewsPage tests',
  );
}

jest.mock('#app/hooks/useOptimizelyVariation', () => ({
  __esModule: true,
  ...jest.requireActual('#app/hooks/useOptimizelyVariation'),
  default: jest.fn(),
}));

jest.mock('#app/hooks/useUASRecentActivity');
jest.mock('#app/hooks/useUASFollowedTopics');

const mockUseRecentActivity = useUASRecentActivity as jest.MockedFunction<
  typeof useUASRecentActivity
>;
const mockUseFollowedTopics = useUASFollowedTopics as jest.MockedFunction<
  typeof useUASFollowedTopics
>;

const mockUseFollowedTopics = useUASFollowedTopics as jest.MockedFunction<
  typeof useUASFollowedTopics
>;

const renderOptions = {
  service: 'hindi' as const,
  toggles: {
    uasPersonalization: { enabled: true, value: 'hindi' },
    topicUasPersonalization: { enabled: true, value: 'hindi' },
  },
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
    mockUseFollowedTopics.mockReturnValue({
      followedTopics: [],
      total: 0,
      isLoading: false,
      error: null,
    });
    mockMatchMedia();
  });

  it('should render loading state initially', async () => {
    mockUseRecentActivity.mockReturnValue({
      savedArticles: [],
      total: 0,
      isLoading: true,
      error: null,
    });

    await act(async () => {
      render(<MyNewsPage />, renderOptions);
    });

    const spinnerWrapper = screen.getByTestId('my-news-page-spinner');
    const spinnerSvg = spinnerWrapper.querySelector('svg');

    expect(spinnerWrapper).toBeInTheDocument();
    expect(spinnerSvg).toBeInTheDocument();
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
        screen.getByText(myNewsTranslations.noArticles),
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
        screen.getByText(myNewsTranslations.errorText),
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
        itemsPerPage: 24,
        startIndex: 0,
      }),
    );
  });

  it('should render guest page with action buttons when user is not logged in', async () => {
    await act(async () => {
      render(<MyNewsPage />, {
        ...renderOptions,
        idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: false },
      });
    });

    expect(
      screen.getByTestId('my-news-guest-sign-in-link'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('my-news-register-link')).toBeInTheDocument();
  });

  it('should render followed topics when there are no saved articles', async () => {
    mockUseFollowedTopics.mockReturnValue({
      followedTopics: [
        { id: 'topic-1', title: 'Cricket', service: 'hindi' },
        { id: 'topic-2', title: 'Elections', service: 'hindi' },
      ],
      total: 2,
      isLoading: false,
      error: null,
    });

    await act(async () => {
      render(<MyNewsPage />, renderOptions);
    });

    await waitFor(() => {
      expect(screen.getByText('Followed Topics (2)')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Cricket' })).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: 'Elections' }),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(myNewsTranslations.noArticles),
      ).not.toBeInTheDocument();
    });
  });

  it('should render followed topics alongside saved articles', async () => {
    mockUseRecentActivity.mockReturnValue({
      savedArticles: mockSavedArticles,
      total: 2,
      isLoading: false,
      error: null,
    });
    mockUseFollowedTopics.mockReturnValue({
      followedTopics: [{ id: 'topic-1', title: 'Cricket', service: 'hindi' }],
      total: 1,
      isLoading: false,
      error: null,
    });

    await act(async () => {
      render(<MyNewsPage />, renderOptions);
    });

    await waitFor(() => {
      expect(screen.getByText('Followed Topics (1)')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Cricket' })).toBeInTheDocument();
      expect(screen.getByText('Saved Article One')).toBeInTheDocument();
      expect(screen.getByText('Saved Article Two')).toBeInTheDocument();
    });
  });

  it('should render loading state while followed topics are loading', async () => {
    mockUseFollowedTopics.mockReturnValue({
      followedTopics: [],
      total: 0,
      isLoading: true,
      error: null,
    });

    await act(async () => {
      render(<MyNewsPage />, renderOptions);
    });

    expect(screen.getByTestId('my-news-page-spinner')).toBeInTheDocument();
  });

  it('should display error state when followed topics API fails', async () => {
    mockUseFollowedTopics.mockReturnValue({
      followedTopics: [],
      total: 0,
      isLoading: false,
      error: new Error('Failed to load topics'),
    });

    await act(async () => {
      render(<MyNewsPage />, renderOptions);
    });

    await waitFor(() => {
      expect(
        screen.getByText(myNewsTranslations.errorText),
      ).toBeInTheDocument();
    });
  });
});
