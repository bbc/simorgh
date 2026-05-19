import userEvent from '@testing-library/user-event';
import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import type { IdctaConfig } from '#app/models/types/account';
import useToggle from '#app/hooks/useToggle';
import AccountPromotionalBanner from '.';
import { DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS } from './utilities';

const idctaConfig: IdctaConfig = {
  'id-availability': 'GREEN',
  unavailable_url: 'https://example.com/unavailable',
  signin_url: 'https://example.com/signin',
  register_url: 'https://example.com/register',
  settings_url: 'https://example.com/settings',
  signout_url: 'https://example.com/signout',
  foryou_url: 'https://example.com/foryou',
  initialIsSignedIn: false,
  identity: {
    idSignedInCookieName: 'ckns_id',
  },
} as unknown as IdctaConfig;

jest.mock('#app/hooks/useToggle');

const renderWithProviders = (idctaOverrides: Partial<IdctaConfig> = {}) =>
  render(<AccountPromotionalBanner />, {
    service: 'ws',
    idctaConfig: {
      ...idctaConfig,
      ...idctaOverrides,
    },
  });

describe('AccountPromotionalBanner', () => {
  beforeEach(() => {
    (useToggle as jest.Mock).mockReturnValue({ enabled: true });
    localStorage.removeItem('account_promotional_banner_dismissals');
    localStorage.removeItem('account_promotional_banner_last_dismissed');
    document.documentElement.classList.remove(
      DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS,
    );
  });

  it('renders when signed out and IDCTA is available', async () => {
    document.documentElement.classList.add(
      DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS,
    );
    renderWithProviders();

    expect(
      await screen.findByRole('heading', { name: 'Discover your BBC' }),
    ).toBeInTheDocument();
  });

  it('shows a sign in link when rendered', () => {
    document.documentElement.classList.add(
      DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS,
    );
    renderWithProviders();

    const signInLink = screen.getByRole('link', { name: /sign in/i });
    expect(signInLink).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com/signin'),
    );
  });

  it('shows a register link when rendered', () => {
    document.documentElement.classList.add(
      DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS,
    );
    renderWithProviders();

    const registerLink = screen.getByRole('link', { name: /register/i });
    expect(registerLink).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com/register'),
    );
  });

  it('does not render when signed in', () => {
    renderWithProviders({ initialIsSignedIn: true });

    expect(
      screen.queryByRole('heading', { name: 'Discover your BBC' }),
    ).not.toBeInTheDocument();
  });

  it('can be dismissed via close button', async () => {
    const user = userEvent.setup();
    document.documentElement.classList.add(
      DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS,
    );
    renderWithProviders();

    const closeButton = await screen.findByRole('button', { name: /close/i });
    await user.click(closeButton);

    expect(
      screen.queryByRole('heading', { name: 'Discover your BBC' }),
    ).not.toBeInTheDocument();
  });

  it('does not render when IDCTA is not available', () => {
    renderWithProviders({ 'id-availability': 'RED' });

    expect(
      screen.queryByRole('heading', { name: 'Discover your BBC' }),
    ).not.toBeInTheDocument();
  });

  it('does not render when account toggle is disabled', () => {
    (useToggle as jest.Mock).mockReturnValue({ enabled: false });
    renderWithProviders();

    expect(
      screen.queryByRole('heading', { name: 'Discover your BBC' }),
    ).not.toBeInTheDocument();
  });

  it('does not render when banner has been previously dismissed', () => {
    localStorage.setItem('account_promotional_banner_dismissals', '3');
    renderWithProviders();

    expect(
      screen.queryByRole('heading', { name: 'Discover your BBC' }),
    ).not.toBeInTheDocument();
  });

  it('writes dismissal data to localStorage when the close button is clicked', async () => {
    const user = userEvent.setup();
    document.documentElement.classList.add(
      DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS,
    );
    renderWithProviders();

    const closeButton = await screen.findByRole('button', { name: /close/i });
    await user.click(closeButton);

    expect(localStorage.getItem('account_promotional_banner_dismissals')).toBe(
      '1',
    );
    expect(
      Number(localStorage.getItem('account_promotional_banner_last_dismissed')),
    ).toBeGreaterThan(0);
  });

  it('does not render when last dismissed is within the interval', () => {
    const now = Date.now();
    localStorage.setItem('account_promotional_banner_last_dismissed', `${now}`);
    renderWithProviders();

    expect(
      screen.queryByRole('heading', { name: 'Discover your BBC' }),
    ).not.toBeInTheDocument();
  });

  it('renders again after the interval has passed', () => {
    const past = Date.now() - 11 * 24 * 60 * 60 * 1000; // 11 days ago
    localStorage.setItem(
      'account_promotional_banner_last_dismissed',
      `${past}`,
    );
    document.documentElement.classList.add(
      DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS,
    );
    renderWithProviders();

    expect(
      screen.queryByRole('heading', { name: 'Discover your BBC' }),
    ).toBeInTheDocument();
  });

  it('treats malformed stored values as zero dismissals', () => {
    localStorage.setItem('account_promotional_banner_dismissals', 'invalid');
    document.documentElement.classList.add(
      DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS,
    );
    renderWithProviders();

    expect(
      screen.queryByRole('heading', { name: 'Discover your BBC' }),
    ).toBeInTheDocument();
  });
});
