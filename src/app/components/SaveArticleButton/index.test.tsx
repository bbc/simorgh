import useUASButton from '#app/hooks/useUASButton';
import { render, screen } from '../react-testing-library-with-providers';
import SaveArticleButton from './index';

jest.mock('#app/hooks/useUASButton');

const mockedUseUASButton = useUASButton as jest.Mock;

describe('SaveArticleButton', () => {
  const defaultProps = {
    isSignedIn: true,
    articleId: '123',
    service: 'hindi',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('does not render button when showButton is false', () => {
    mockedUseUASButton.mockReturnValue({
      showButton: false,
      isSaved: false,
      loading: false,
    });

    const { container } = render(<SaveArticleButton {...defaultProps} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders "Save for later" when not saved', () => {
    mockedUseUASButton.mockReturnValue({
      showButton: true,
      isSaved: false,
      loading: false,
    });

    render(<SaveArticleButton {...defaultProps} />);
    expect(screen.getByRole('button')).toHaveTextContent('Save for later');
  });

  test('renders "Remove from saved" when saved', () => {
    mockedUseUASButton.mockReturnValue({
      showButton: true,
      isSaved: true,
      loading: false,
    });

    render(<SaveArticleButton {...defaultProps} />);
    expect(screen.getByRole('button')).toHaveTextContent('Remove from saved');
  });

  test('renders loading state and disables button', () => {
    mockedUseUASButton.mockReturnValue({
      showButton: true,
      isSaved: false,
      loading: true,
    });

    render(<SaveArticleButton {...defaultProps} />);
    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Loading...');
    expect(button).toBeDisabled();
  });
});
