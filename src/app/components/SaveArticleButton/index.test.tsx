import useUASButton from '#app/hooks/useUASButton';
import { render, screen } from '../react-testing-library-with-providers';
import SaveArticleButton from './index';

jest.mock('#app/hooks/useUASButton');

const mockedUseUASButton = useUASButton as jest.Mock;

describe('SaveArticleButton', () => {
  const defaultProps = {
    articleTitle: 'Test Article Title',
  };

  const mockHandleSaveAction = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('does not render button when showButton is false', () => {
    mockedUseUASButton.mockReturnValue({
      showButton: false,
      isSaved: false,
      isLoading: false,
      handleSaveAction: mockHandleSaveAction,
    });

    const { container } = render(<SaveArticleButton {...defaultProps} />, {
      service: 'hindi',
    });
    expect(container.firstChild).toBeNull();
  });

  it('renders "Save for later" when not saved', () => {
    mockedUseUASButton.mockReturnValue({
      showButton: true,
      isSaved: false,
      isLoading: false,
      handleSaveAction: mockHandleSaveAction,
    });

    render(<SaveArticleButton {...defaultProps} />, { service: 'hindi' });
    expect(screen.getByRole('button')).toHaveTextContent('Save for later');
  });

  it('renders "Saved to My News" when saved', () => {
    mockedUseUASButton.mockReturnValue({
      showButton: true,
      isSaved: true,
      isLoading: false,
      handleSaveAction: mockHandleSaveAction,
    });

    render(<SaveArticleButton {...defaultProps} />, { service: 'hindi' });
    expect(screen.getByRole('button')).toHaveTextContent('Saved to My News');
  });

  it('renders loading state and disables button', () => {
    mockedUseUASButton.mockReturnValue({
      showButton: true,
      isSaved: false,
      isLoading: true,
      handleSaveAction: mockHandleSaveAction,
    });

    render(<SaveArticleButton {...defaultProps} />, { service: 'hindi' });
    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Saving');
    expect(button).toBeDisabled();
  });

  it('calls handleSaveAction with save when button is clicked and not already saved', async () => {
    mockedUseUASButton.mockReturnValue({
      showButton: true,
      isSaved: false,
      isLoading: false,
      handleSaveAction: mockHandleSaveAction,
    });

    render(<SaveArticleButton {...defaultProps} />, { service: 'hindi' });
    screen.getByRole('button').click();

    expect(mockHandleSaveAction).toHaveBeenCalledWith('save');
    expect(mockHandleSaveAction).toHaveBeenCalledTimes(1);
  });

  it('passes articleId and title to useUASButton hook', () => {
    mockedUseUASButton.mockReturnValue({
      showButton: true,
      isSaved: false,
      isLoading: false,
      handleSaveAction: mockHandleSaveAction,
    });

    type ArticlePageData = React.ComponentProps<
      typeof SaveArticleButton
    >['articlePageData'];
    const articlePageData: ArticlePageData = {
      metadata: {
        locators: {
          canonicalUrl: 'https://www.bbc.com/hindi/articles/c1l97706v5mo',
        },
      },
    } as ArticlePageData;

    render(
      <SaveArticleButton {...defaultProps} articlePageData={articlePageData} />,
    );

    expect(mockedUseUASButton).toHaveBeenCalledWith({
      articleId: 'c1l97706v5mo',
      articleTitle: 'Test Article Title',
      articlePageData,
    });
  });

  it('extracts articleId from metadata when canonicalUrl is not available', () => {
    mockedUseUASButton.mockReturnValue({
      showButton: true,
      isSaved: false,
      isLoading: false,
      handleSaveAction: mockHandleSaveAction,
    });

    type ArticlePageData = React.ComponentProps<
      typeof SaveArticleButton
    >['articlePageData'];
    const articlePageData: ArticlePageData = {
      metadata: {
        id: 'urn:bbc:ares::article:test123',
      },
    } as ArticlePageData;

    render(
      <SaveArticleButton {...defaultProps} articlePageData={articlePageData} />,
    );

    expect(mockedUseUASButton).toHaveBeenCalledWith({
      articleId: 'test123',
      articleTitle: 'Test Article Title',
      articlePageData,
    });
  });

  it('passes empty articleId when no articlePageData is provided', () => {
    mockedUseUASButton.mockReturnValue({
      showButton: true,
      isSaved: false,
      isLoading: false,
      handleSaveAction: mockHandleSaveAction,
    });

    render(<SaveArticleButton {...defaultProps} />, { service: 'hindi' });

    expect(mockedUseUASButton).toHaveBeenCalledWith({
      articleId: '',
      articleTitle: 'Test Article Title',
      articlePageData: undefined,
    });
  });
});
