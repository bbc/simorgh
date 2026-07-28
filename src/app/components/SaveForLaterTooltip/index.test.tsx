import userEvent from '@testing-library/user-event';
import { render, screen } from '../react-testing-library-with-providers';
import SaveForLaterTooltip from '.';

const onClose = jest.fn();

describe('SaveForLaterTooltip', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders the success title with a My News link', () => {
    render(<SaveForLaterTooltip status="success" onClose={onClose} />, {
      service: 'hindi',
    });

    expect(
      screen.getByText(/This article is now saved to/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'My News' })).toHaveAttribute(
      'href',
      'https://www.bbc.com/hindi/my-news',
    );
    expect(
      screen.queryByText(/check your connection/i),
    ).not.toBeInTheDocument();
  });

  it('renders the error title and body without a link', () => {
    render(<SaveForLaterTooltip status="error" onClose={onClose} />, {
      service: 'hindi',
    });

    expect(screen.getByText('Sorry, something went wrong')).toBeInTheDocument();
    expect(
      screen.getByText('Check your connection, refresh the page and try again'),
    ).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders the removed title with a My News link', () => {
    render(<SaveForLaterTooltip status="removed" onClose={onClose} />, {
      service: 'hindi',
    });

    expect(
      screen.getByText(/This article has now been removed from/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'My News' })).toBeInTheDocument();
    expect(
      screen.queryByText(/check your connection/i),
    ).not.toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    render(<SaveForLaterTooltip status="success" onClose={onClose} />, {
      service: 'hindi',
    });

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('exposes the tooltip as a polite live region for assistive technology', () => {
    render(<SaveForLaterTooltip status="success" onClose={onClose} />, {
      service: 'hindi',
    });

    const tooltip = screen.getByTestId('save-for-later-tooltip');

    expect(tooltip).toHaveAttribute('role', 'status');
    expect(tooltip).toHaveAttribute('aria-live', 'polite');
    expect(tooltip).toHaveAttribute('aria-atomic', 'true');
  });
});
