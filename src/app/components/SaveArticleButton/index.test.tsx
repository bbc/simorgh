import useUASButton from '#app/hooks/useUASButton';
import { render, screen } from '../react-testing-library-with-providers';
import SaveArticleButton from './index';

jest.mock('#app/hooks/useUASButton');

const mockedUseUASButton = useUASButton as jest.Mock;

describe('SaveArticleButton', () => {
  const defaultProps = {
    articleId: '123',
    service: 'hindi',
    title: 'Test Article Title',
  };

  const mockHandleSaveArticle = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('does not render button when showButton is false', () => {
    mockedUseUASButton.mockReturnValue({
      showButton: false,
      isSaved: false,
      isLoading: false,
      handleSaveArticle: mockHandleSaveArticle,
    });

    const { container } = render(<SaveArticleButton {...defaultProps} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders "Save for later" when not saved', () => {
    mockedUseUASButton.mockReturnValue({
      showButton: true,
      isSaved: false,
      isLoading: false,
      handleSaveArticle: mockHandleSaveArticle,
    });

    render(<SaveArticleButton {...defaultProps} />);
    expect(screen.getByRole('button')).toHaveTextContent('Save for later');
  });

  test('renders "Remove from saved" when saved', () => {
    mockedUseUASButton.mockReturnValue({
      showButton: true,
      isSaved: true,
      isLoading: false,
      handleSaveArticle: mockHandleSaveArticle,
    });

    render(<SaveArticleButton {...defaultProps} />);
    expect(screen.getByRole('button')).toHaveTextContent('Remove from saved');
  });

  test('renders loading state and disables button', () => {
    mockedUseUASButton.mockReturnValue({
      showButton: true,
      isSaved: false,
      isLoading: true,
      handleSaveArticle: mockHandleSaveArticle,
    });

    render(<SaveArticleButton {...defaultProps} />);
    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Loading...');
    expect(button).toBeDisabled();
  });

  test('calls handleSaveArticle when button is clicked', async () => {
    mockedUseUASButton.mockReturnValue({
      showButton: true,
      isSaved: false,
      isLoading: false,
      handleSaveArticle: mockHandleSaveArticle,
    });

    render(<SaveArticleButton {...defaultProps} />);
    screen.getByRole('button').click();

    expect(mockHandleSaveArticle).toHaveBeenCalledTimes(1);
  });

  test('passes title to useUASButton hook', () => {
    mockedUseUASButton.mockReturnValue({
      showButton: true,
      isSaved: false,
      isLoading: false,
      handleSaveArticle: mockHandleSaveArticle,
    });

    render(<SaveArticleButton {...defaultProps} />);

    expect(mockedUseUASButton).toHaveBeenCalledWith({
      articleId: '123',
      service: 'hindi',
      title: 'Test Article Title',
    });
  });
});
