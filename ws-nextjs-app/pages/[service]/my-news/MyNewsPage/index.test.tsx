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

const mockFollowedTopics = [
  { id: 'topic-1', title: 'Cricket', service: 'hindi' },
  { id: 'topic-2', title: 'Elections', service: 'hindi' },
];

describe('MyNewsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.scrollTo = jest.fn();
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

    const spinnerWrapper = screen.getByTestId('my-news-saved-articles-spinner');
    const spinnerSvg = spinnerWrapper.querySelector('svg');

    expect(screen.getByText(myNewsTranslations.title)).toBeInTheDocument();
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
      expect(
        screen.getByText(myNewsTranslations.noFollowedTopics),
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
        screen.getByText(myNewsTranslations.savedArticlesErrorText),
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
      followedTopics: mockFollowedTopics,
      total: mockFollowedTopics.length,
      isLoading: false,
      error: null,
    });

    await act(async () => {
      render(<MyNewsPage />, renderOptions);
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          `${myNewsTranslations.followedTopicsTitle} (${mockFollowedTopics.length})`,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: mockFollowedTopics[0].title }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: mockFollowedTopics[1].title }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(myNewsTranslations.noArticles),
      ).toBeInTheDocument();
    });
  });

  it('should show the count of actually rendered topics, not the raw API total', async () => {
    mockUseFollowedTopics.mockReturnValue({
      followedTopics: mockFollowedTopics,
      total: mockFollowedTopics.length + 1,
      isLoading: false,
      error: null,
    });

    await act(async () => {
      render(<MyNewsPage />, renderOptions);
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          `${myNewsTranslations.followedTopicsTitle} (${mockFollowedTopics.length})`,
        ),
      ).toBeInTheDocument();
    });
  });

  it('should render followed topics alongside saved articles', async () => {
    const [singleFollowedTopic] = mockFollowedTopics;

    mockUseRecentActivity.mockReturnValue({
      savedArticles: mockSavedArticles,
      total: 2,
      isLoading: false,
      error: null,
    });
    mockUseFollowedTopics.mockReturnValue({
      followedTopics: [singleFollowedTopic],
      total: 1,
      isLoading: false,
      error: null,
    });

    await act(async () => {
      render(<MyNewsPage />, renderOptions);
    });

    await waitFor(() => {
      expect(
        screen.getByText(`${myNewsTranslations.followedTopicsTitle} (1)`),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: singleFollowedTopic.title }),
      ).toBeInTheDocument();
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

    expect(
      screen.getByTestId('my-news-followed-topics-spinner'),
    ).toBeInTheDocument();
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
        screen.getByText(myNewsTranslations.followedTopicsErrorText),
      ).toBeInTheDocument();
    });
  });

  it('should show only the failed Topics section error when followed topics fails and saved articles succeed', async () => {
    mockUseRecentActivity.mockReturnValue({
      savedArticles: mockSavedArticles,
      total: 2,
      isLoading: false,
      error: null,
    });
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
        screen.getByText(myNewsTranslations.followedTopicsErrorText),
      ).toBeInTheDocument();
      expect(screen.getByText('Saved Article One')).toBeInTheDocument();
      expect(screen.getByText('Saved Article Two')).toBeInTheDocument();
      expect(
        screen.queryByText(myNewsTranslations.savedArticlesErrorText),
      ).not.toBeInTheDocument();
    });
  });

  it('should show only the failed Articles section error when saved articles fails and followed topics succeed', async () => {
    mockUseRecentActivity.mockReturnValue({
      savedArticles: [],
      total: 0,
      isLoading: false,
      error: new Error('Failed to load articles'),
    });
    mockUseFollowedTopics.mockReturnValue({
      followedTopics: mockFollowedTopics,
      total: mockFollowedTopics.length,
      isLoading: false,
      error: null,
    });

    await act(async () => {
      render(<MyNewsPage />, renderOptions);
    });

    await waitFor(() => {
      expect(
        screen.getByText(myNewsTranslations.savedArticlesErrorText),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: mockFollowedTopics[0].title }),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(myNewsTranslations.followedTopicsErrorText),
      ).not.toBeInTheDocument();
    });
  });

  it('should show a single combined error message when both sections fail', async () => {
    mockUseRecentActivity.mockReturnValue({
      savedArticles: [],
      total: 0,
      isLoading: false,
      error: new Error('Failed to load articles'),
    });
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
        screen.getByText(myNewsTranslations.contentErrorText),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(myNewsTranslations.savedArticlesErrorText),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(myNewsTranslations.followedTopicsErrorText),
      ).not.toBeInTheDocument();
    });
  });

  it('should not render a "see more" button when there are 9 or fewer followed topics', async () => {
    mockUseFollowedTopics.mockReturnValue({
      followedTopics: mockFollowedTopics,
      total: mockFollowedTopics.length,
      isLoading: false,
      error: null,
    });

    await act(async () => {
      render(<MyNewsPage />, renderOptions);
    });

    await waitFor(() => {
      expect(
        screen.getByRole('link', { name: mockFollowedTopics[0].title }),
      ).toBeInTheDocument();
    });

    expect(
      screen.queryByRole('button', { name: myNewsTranslations.seeMoreTopics }),
    ).not.toBeInTheDocument();
  });

  it('should cap followed topics at 9 and toggle the rest via the "see more"/"see less" button', async () => {
    const manyFollowedTopics = Array.from({ length: 13 }, (_, i) => ({
      id: `topic-${i}`,
      title: `Topic ${i}`,
      service: 'hindi',
    }));

    mockUseFollowedTopics.mockReturnValue({
      followedTopics: manyFollowedTopics,
      total: manyFollowedTopics.length,
      isLoading: false,
      error: null,
    });

    await act(async () => {
      render(<MyNewsPage />, renderOptions);
    });

    await waitFor(() => {
      expect(
        screen.getByRole('link', { name: manyFollowedTopics[8].title }),
      ).toBeInTheDocument();
    });

    expect(
      screen.queryByRole('link', { name: manyFollowedTopics[9].title }),
    ).not.toBeInTheDocument();

    const seeMoreButton = screen.getByRole('button', {
      name: myNewsTranslations.seeMoreTopics,
    });
    expect(seeMoreButton).toHaveAttribute('aria-expanded', 'false');

    await act(async () => {
      seeMoreButton.click();
    });

    await waitFor(() => {
      expect(
        screen.getByRole('link', { name: manyFollowedTopics[12].title }),
      ).toBeInTheDocument();
    });

    const seeLessButton = screen.getByRole('button', {
      name: myNewsTranslations.seeLessTopics,
    });
    expect(seeLessButton).toHaveAttribute('aria-expanded', 'true');

    await act(async () => {
      seeLessButton.click();
    });

    await waitFor(() => {
      expect(
        screen.queryByRole('link', { name: manyFollowedTopics[9].title }),
      ).not.toBeInTheDocument();
    });

    expect(
      screen.getByRole('button', { name: myNewsTranslations.seeMoreTopics }),
    ).toHaveAttribute('aria-expanded', 'false');
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('should scroll to top without animation when reduced motion is preferred', async () => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn().mockImplementation(query => ({
        matches: true,
        media: query,
      })),
      writable: true,
    });

    const manyFollowedTopics = Array.from({ length: 13 }, (_, i) => ({
      id: `topic-${i}`,
      title: `Topic ${i}`,
      service: 'hindi',
    }));

    mockUseFollowedTopics.mockReturnValue({
      followedTopics: manyFollowedTopics,
      total: manyFollowedTopics.length,
      isLoading: false,
      error: null,
    });

    await act(async () => {
      render(<MyNewsPage />, renderOptions);
    });

    await act(async () => {
      screen
        .getByRole('button', { name: myNewsTranslations.seeMoreTopics })
        .click();
    });

    await act(async () => {
      screen
        .getByRole('button', { name: myNewsTranslations.seeLessTopics })
        .click();
    });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'auto',
    });
  });

  it('should only render the saved articles section when topic personalization is disabled', async () => {
    mockUseFollowedTopics.mockReturnValue({
      followedTopics: mockFollowedTopics,
      total: mockFollowedTopics.length,
      isLoading: false,
      error: null,
    });

    await act(async () => {
      render(<MyNewsPage />, {
        ...renderOptions,
        toggles: {
          uasPersonalization: { enabled: true, value: 'hindi' },
          topicUasPersonalization: { enabled: false, value: 'hindi' },
        },
      });
    });

    await waitFor(() => {
      expect(
        screen.getByText(myNewsTranslations.description),
      ).toBeInTheDocument();
    });

    expect(
      screen.queryByRole('link', { name: mockFollowedTopics[0].title }),
    ).not.toBeInTheDocument();
  });

  it('should only render the followed topics section when article personalization is disabled', async () => {
    mockUseFollowedTopics.mockReturnValue({
      followedTopics: mockFollowedTopics,
      total: mockFollowedTopics.length,
      isLoading: false,
      error: null,
    });

    await act(async () => {
      render(<MyNewsPage />, {
        ...renderOptions,
        toggles: {
          uasPersonalization: { enabled: false, value: 'hindi' },
          topicUasPersonalization: { enabled: true, value: 'hindi' },
        },
      });
    });

    await waitFor(() => {
      expect(
        screen.getByRole('link', { name: mockFollowedTopics[0].title }),
      ).toBeInTheDocument();
    });

    expect(
      screen.queryByText(myNewsTranslations.description),
    ).not.toBeInTheDocument();
  });
});
