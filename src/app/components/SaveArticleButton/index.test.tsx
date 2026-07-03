import useUASButton from '#app/hooks/useUASButton';
import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import extractArticleMetadata from '#app/lib/utilities/extractSaveArticleProps';
import { Article } from '#app/models/types/optimo';
import { render, screen, act } from '../react-testing-library-with-providers';
import SaveArticleButton from '.';

jest.mock('#app/components/Account/AccountSignInModal', () => ({
  __esModule: true,
  default: ({ onClose }: { onClose: () => void }) => (
    <div role="dialog" aria-label="Sign in to BBC">
      <button type="button" onClick={onClose} aria-label="Close">
        Close
      </button>
    </div>
  ),
}));

jest.mock('#app/hooks/useUASButton');

const mockedUseUASButton = useUASButton as jest.Mock;

const personalizationToggle = {
  uasPersonalization: { enabled: true, value: 'hindi' },
};

describe('SaveArticleButton', () => {
  const articlePageData = {
    content: {
      model: {
        blocks: [],
      },
    },
    metadata: {
      locators: {
        canonicalUrl: 'https://www.bbc.com/hindi/articles/c1l97706v5mo',
      },
    },
    promo: {
      images: {
        defaultPromoImage: {
          blocks: [],
        },
      },
    },
  } as unknown as Article;
  const articleExtractPageData = extractArticleMetadata(articlePageData);

  const defaultProps = { articlePageData: articleExtractPageData };

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
      expect(screen.getByRole('button')).toHaveTextContent(
        'बाद में पढ़ने के लिए सहेजें',
      );
    });

    it('renders Saved to My News when saved', async () => {
      mockedUseUASButton.mockReturnValue({ isSaved: true });

      await act(async () =>
        render(<SaveArticleButton {...defaultProps} />, signedInRenderOptions),
      );
      expect(screen.getByRole('button')).toHaveTextContent(
        'मेरी ख़बरों में सहेजा गया',
      );
    });

    it('renders loading state and keeps the button focusable', async () => {
      mockedUseUASButton.mockReturnValue({
        isLoading: true,
        isUpdating: false,
      });

      await act(async () =>
        render(<SaveArticleButton {...defaultProps} />, signedInRenderOptions),
      );
      const button = screen.getByRole('button');

      expect(button).toHaveTextContent('लोड हो रहा है');
      expect(button).toBeEnabled();
    });

    it('renders saving state and keeps the button focusable', async () => {
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

      expect(button).toHaveTextContent('सहेजा जा रहा है');
      expect(button).toBeEnabled();
    });

    it('renders removing state and keeps the button focusable', async () => {
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

      expect(button).toHaveTextContent('हटाया जा रहा है');
      expect(button).toBeEnabled();
    });

    it('calls handleSaveAction with save when button is clicked and not already saved', async () => {
      await act(async () =>
        render(<SaveArticleButton {...defaultProps} />, signedInRenderOptions),
      );
      screen.getByRole('button').click();

      expect(mockHandleSaveAction).toHaveBeenCalledWith('save');
      expect(mockHandleSaveAction).toHaveBeenCalledTimes(1);
    });

    it('passes articleId to useUASButton hook', async () => {
      await act(async () =>
        render(<SaveArticleButton {...defaultProps} />, {
          ...signedInRenderOptions,
          pathname: '/hindi/articles/c1l97706v5mo',
        }),
      );

      expect(mockedUseUASButton).toHaveBeenCalledWith(
        expect.objectContaining({
          articlePageData: articleExtractPageData,
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

    it('opens the sign-in modal when the save button is clicked', async () => {
      await act(async () =>
        render(<SaveArticleButton {...defaultProps} />, signedOutRenderOptions),
      );
      await act(async () => {
        screen.getByTestId('save-article-btn-guest').click();
      });
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('closes the sign-in modal when the close button is clicked', async () => {
      await act(async () =>
        render(<SaveArticleButton {...defaultProps} />, signedOutRenderOptions),
      );
      await act(async () => {
        screen.getByTestId('save-article-btn-guest').click();
      });
      await act(async () => {
        screen.getByRole('button', { name: 'Close' }).click();
      });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
