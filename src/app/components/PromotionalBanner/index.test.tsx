import {
  render,
  screen,
  fireEvent,
} from '../react-testing-library-with-providers';
import PromotionalBanner from '.';
import { PromotionalBannerProps } from './index.types';

describe('PromotionalBanner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps: PromotionalBannerProps = {
    title: 'Install our app',
    description: 'Get the best experience by installing our app.',
    isDismissible: true,
    orText: 'or',
    bannerLabel: 'Promotional Banner',
    closeLabel: 'Close',
    primaryButton: {
      text: 'Install',
      longText: 'Install the PWA App',
    },
    secondaryButton: {
      text: 'Not now',
    },
    onPrimaryClick: jest.fn(),
    onSecondaryClick: jest.fn(),
    onClose: jest.fn(),
  };

  it('renders default props', () => {
    render(<PromotionalBanner {...defaultProps} />);
    expect(screen.getByText('Install our app')).toBeInTheDocument();
    expect(
      screen.getByText('Get the best experience by installing our app.'),
    ).toBeInTheDocument();
    expect(screen.getByText('or')).toBeInTheDocument();
    expect(screen.getByText('Install')).toBeInTheDocument();
    expect(screen.getByText('Not now')).toBeInTheDocument();
  });

  it('calls the primary button click handler when short text is present', () => {
    render(<PromotionalBanner {...defaultProps} />);
    fireEvent.click(screen.getByText('Install'));
    expect(defaultProps.onPrimaryClick).toHaveBeenCalledTimes(1);
  });

  it('calls the primary button click handler when long text is present', () => {
    render(<PromotionalBanner {...defaultProps} />);
    fireEvent.click(screen.getByText('Install the PWA App'));
    expect(defaultProps.onPrimaryClick).toHaveBeenCalledTimes(1);
  });

  it('renders the banner with title and description', () => {
    render(<PromotionalBanner {...defaultProps} />);

    expect(screen.getByText('Install our app')).toBeInTheDocument();
    expect(
      screen.getByText('Get the best experience by installing our app.'),
    ).toBeInTheDocument();
  });

  it('renders primary and secondary buttons', () => {
    render(<PromotionalBanner {...defaultProps} />);

    expect(screen.getByText('Install the PWA App')).toBeInTheDocument();
    expect(screen.getByText('Not now')).toBeInTheDocument();
  });

  it('calls the primary button click handler when clicked', () => {
    render(<PromotionalBanner {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: /Install/i }));
    expect(defaultProps.onPrimaryClick).toHaveBeenCalledTimes(1);
  });

  it('calls the secondary button click handler when clicked', () => {
    render(<PromotionalBanner {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: /not now/i }));
    expect(defaultProps.onSecondaryClick).toHaveBeenCalledTimes(1);
  });

  it('calls the close button click handler when clicked', () => {
    render(<PromotionalBanner {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });
  it('renders the dismiss button when isDismissible is true', () => {
    render(<PromotionalBanner {...defaultProps} />);
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('does not render the dismiss button when isDismissible is false', () => {
    render(<PromotionalBanner {...defaultProps} isDismissible={false} />);

    expect(
      screen.queryByRole('button', { name: /close/i }),
    ).not.toBeInTheDocument();
  });
});
