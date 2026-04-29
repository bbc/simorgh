import userEvent from '@testing-library/user-event';
import Cookie from 'js-cookie';
import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import type { IdctaConfig } from '#app/models/types/account';
import useToggle from '#app/hooks/useToggle';
import AccountPromotionalBanner from '.';
import {
  ACCOUNT_BANNER_DISMISS_COOKIE,
  ACCOUNT_BANNER_LAST_DISMISS_COOKIE,
} from './utilities';

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

const renderWithProviders = (
  idctaOverrides: Partial<IdctaConfig> = {},
  isAccountPromoBannerVisible = true,
) =>
  render(<AccountPromotionalBanner />, {
    service: 'ws',
    idctaConfig: {
      ...idctaConfig,
      initialIsAccountPromoBannerVisible: isAccountPromoBannerVisible,
      ...idctaOverrides,
    },
  });

describe('AccountPromotionalBanner', () => {
  beforeEach(() => {
    (useToggle as jest.Mock).mockReturnValue({ enabled: true });
    Cookie.remove(ACCOUNT_BANNER_DISMISS_COOKIE);
    Cookie.remove(ACCOUNT_BANNER_LAST_DISMISS_COOKIE);
  });

  it('renders when signed out and IDCTA is available', async () => {
    renderWithProviders();

    expect(
      await screen.findByRole('heading', { name: 'Discover your BBC' }),
    ).toBeInTheDocument();
  });

  it('shows a sign in link when rendered', () => {
    renderWithProviders();

    const signInLink = screen.getByRole('link', { name: /sign in/i });
    expect(signInLink).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com/signin'),
    );
  });

  it('shows a register link when rendered', () => {
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
    renderWithProviders({}, false);

    expect(
      screen.queryByRole('heading', { name: 'Discover your BBC' }),
    ).not.toBeInTheDocument();
  });

  it('writes dismissal cookies when the close button is clicked', async () => {
    const user = userEvent.setup();
    const cookieSetSpy = jest.spyOn(Cookie, 'set');
    renderWithProviders();

    const closeButton = await screen.findByRole('button', { name: /close/i });
    await user.click(closeButton);

    expect(cookieSetSpy).toHaveBeenCalledWith(
      ACCOUNT_BANNER_DISMISS_COOKIE,
      '1',
      expect.any(Object),
    );
    expect(cookieSetSpy).toHaveBeenCalledWith(
      ACCOUNT_BANNER_LAST_DISMISS_COOKIE,
      expect.any(String),
      expect.any(Object),
    );

    cookieSetSpy.mockRestore();
  });
});
