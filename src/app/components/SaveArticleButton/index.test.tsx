import useUASButton from '#app/hooks/useUASButton';
import { render, screen } from '../react-testing-library-with-providers';
import SaveArticleButton from './index';

jest.mock('#app/hooks/useUASButton');

const mockedUseUASButton = useUASButton as jest.Mock;

describe('SaveArticleButton', () => {
  const defaultProps = {
    articleId: '123',
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

    const { container } = render(<SaveArticleButton {...defaultProps} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders "Save for later" when not saved', () => {
    mockedUseUASButton.mockReturnValue({
      showButton: true,
      isSaved: false,
      isLoading: false,
      handleSaveAction: mockHandleSaveAction,
    });

    render(<SaveArticleButton {...defaultProps} />);
    expect(screen.getByRole('button')).toHaveTextContent('Save for later');
  });

  it('renders "Remove from saved" when saved', () => {
    mockedUseUASButton.mockReturnValue({
      showButton: true,
      isSaved: true,
      isLoading: false,
      handleSaveAction: mockHandleSaveAction,
    });

    render(<SaveArticleButton {...defaultProps} />);
    expect(screen.getByRole('button')).toHaveTextContent('Remove from saved');
  });

  it('renders loading state and disables button', () => {
    mockedUseUASButton.mockReturnValue({
      showButton: true,
      isSaved: false,
      isLoading: true,
      handleSaveAction: mockHandleSaveAction,
    });

    render(<SaveArticleButton {...defaultProps} />);
    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Loading...');
    expect(button).toBeDisabled();
  });

  it('calls handleSaveAction with save when button is clicked and not already saved', async () => {
    mockedUseUASButton.mockReturnValue({
      showButton: true,
      isSaved: false,
      isLoading: false,
      handleSaveAction: mockHandleSaveAction,
    });

    render(<SaveArticleButton {...defaultProps} />);
    screen.getByRole('button').click();

    expect(mockHandleSaveAction).toHaveBeenCalledWith('save');
    expect(mockHandleSaveAction).toHaveBeenCalledTimes(1);
  });

  it('passes title to useUASButton hook', () => {
    mockedUseUASButton.mockReturnValue({
      showButton: true,
      isSaved: false,
      isLoading: false,
      handleSaveAction: mockHandleSaveAction,
    });

    render(<SaveArticleButton {...defaultProps} />);

    expect(mockedUseUASButton).toHaveBeenCalledWith({
      articleId: '123',
      articleTitle: 'Test Article Title',
    });
  });
});
