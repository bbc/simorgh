import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import useUASButton from '#app/hooks/useUASButton';
import { Article } from '#app/models/types/optimo';
import { act, render, screen } from '../react-testing-library-with-providers';
import SaveArticleButton from '.';

jest.mock('#app/hooks/useUASButton');

const mockedUseUASButton = useUASButton as jest.Mock;

const personalizationToggle = {
  uasPersonalization: { enabled: true, value: 'hindi' },
};

describe('SaveArticleButton', () => {
  const defaultProps = {
    articleTitle: 'Test Article Title',
  };

  const mockHandleSaveAction = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Authorized', () => {
    const signedInRenderOptions = {
      service: 'hindi' as const,
      toggles: personalizationToggle,
      idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
    };

    beforeEach(() => {
      mockedUseUASButton.mockReturnValue({
        isSaved: false,
        isLoading: false,
        isUpdating: false,
        error: null,
        handleSaveAction: mockHandleSaveAction,
      });
    });

    it('renders Save for later when not saved', async () => {
      await act(async () =>
        render(<SaveArticleButton {...defaultProps} />, signedInRenderOptions),
      );
      expect(screen.getByRole('button')).toHaveTextContent('Save for later');
    });

    it('renders Saved to My News when saved', async () => {
      mockedUseUASButton.mockReturnValue({ isSaved: true });

      await act(async () =>
        render(<SaveArticleButton {...defaultProps} />, signedInRenderOptions),
      );
      expect(screen.getByRole('button')).toHaveTextContent('Saved to My News');
    });

    it('renders loading state and disables button', async () => {
      mockedUseUASButton.mockReturnValue({
        isLoading: true,
        isUpdating: false,
      });

      await act(async () =>
        render(<SaveArticleButton {...defaultProps} />, signedInRenderOptions),
      );
      const button = screen.getByRole('button');

      expect(button).toHaveTextContent('Loading');
      expect(button).toBeDisabled();
    });

    it('renders saving state and disables button', async () => {
      mockedUseUASButton.mockReturnValue({
        isSaved: false,
        isLoading: false,
        isUpdating: true,
        error: null,
        handleSaveAction: mockHandleSaveAction,
      });

      await act(async () =>
        render(<SaveArticleButton {...defaultProps} />, signedInRenderOptions),
      );
      const button = screen.getByRole('button');

      expect(button).toHaveTextContent('Saving');
      expect(button).toBeDisabled();
    });

    it('renders removing state and disables button', async () => {
      mockedUseUASButton.mockReturnValue({
        isSaved: true,
        isLoading: false,
        isUpdating: true,
        error: null,
        handleSaveAction: mockHandleSaveAction,
      });

      await act(async () =>
        render(<SaveArticleButton {...defaultProps} />, signedInRenderOptions),
      );
      const button = screen.getByRole('button');

      expect(button).toHaveTextContent('Removing');
      expect(button).toBeDisabled();
    });

    it('calls handleSaveAction with save when button is clicked and not already saved', async () => {
      await act(async () =>
        render(<SaveArticleButton {...defaultProps} />, signedInRenderOptions),
      );
      screen.getByRole('button').click();

      expect(mockHandleSaveAction).toHaveBeenCalledWith('save');
      expect(mockHandleSaveAction).toHaveBeenCalledTimes(1);
    });

    it('passes articleId and title to useUASButton hook', async () => {
      const articlePageData = {
        metadata: {
          locators: {
            canonicalUrl: 'https://www.bbc.com/hindi/articles/c1l97706v5mo',
          },
        },
      } as Article;

      await act(async () =>
        render(
          <SaveArticleButton
            {...defaultProps}
            articlePageData={articlePageData}
          />,
          {
            ...signedInRenderOptions,
            pathname: '/hindi/articles/c1l97706v5mo',
          },
        ),
      );

      expect(mockedUseUASButton).toHaveBeenCalledWith(
        expect.objectContaining({
          articleTitle: 'Test Article Title',
          articlePageData,
          articleId: 'c1l97706v5mo',
        }),
      );
    });
  });

  describe('Guest', () => {
    const signedOutRenderOptions = {
      service: 'hindi' as const,
      toggles: personalizationToggle,
      idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: false },
    };

    it('renders guest save button', async () => {
      render(<SaveArticleButton {...defaultProps} />, signedOutRenderOptions);
      expect(screen.getByTestId('save-article-btn-guest')).toBeInTheDocument();
    });
  });
});
