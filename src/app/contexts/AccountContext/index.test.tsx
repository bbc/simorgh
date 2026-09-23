/* eslint-disable @typescript-eslint/no-explicit-any */
import { use } from 'react';
import { IdctaConfig } from '#app/models/types/account';
import useToggle from '#app/hooks/useToggle';
import Cookie from 'js-cookie';
import {
  getDecodedToken,
  TOKEN_COOKIE_NAME,
} from '#app/lib/uasApi/tokenRefresh/tokenManager';
import { AccountContext } from '.';
import {
  render,
  screen,
  waitFor,
} from '../../components/react-testing-library-with-providers';

jest.mock('#app/hooks/useToggle');
jest.mock('js-cookie');
jest.mock('#app/lib/uasApi/tokenRefresh/tokenManager', () => ({
  ...jest.requireActual('#app/lib/uasApi/tokenRefresh/tokenManager'),
  getDecodedToken: jest.fn(),
}));

const mockUseToggle = useToggle as jest.MockedFunction<typeof useToggle>;
const mockGetDecodedToken = getDecodedToken as jest.MockedFunction<
  typeof getDecodedToken
>;
const mockCookieGet = Cookie.get as jest.Mock;

const mockIdctaConfig = {
  'id-availability': 'GREEN',
  signin_url: 'https://example.com/signin',
  register_url: 'https://example.com/register',
  settings_url: 'https://example.com/settings',
  signout_url: 'https://example.com/signout',
  foryou_url: 'https://example.com/foryou',
  unavailable_url: 'https://example.com/unavailable',
  initialIsSignedIn: true,
} as IdctaConfig;

describe('AccountContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockCookieGet.mockReturnValue(undefined);
    mockGetDecodedToken.mockReturnValue(null);

    mockUseToggle.mockImplementation(toggleName => {
      if (toggleName === 'uasPersonalization') {
        return { enabled: true, value: '' };
      }

      if (toggleName === 'topicUasPersonalization') {
        return { enabled: false, value: '' };
      }

      return { enabled: false, value: '' };
    });

    delete (window as any).location;
    window.location = { href: 'https://example.com/current-page' } as any;
  });

  const TestComponent = () => {
    const context = use(AccountContext);
    return <div data-testid="test-component">{JSON.stringify(context)}</div>;
  };

  it('should provide context value to consuming components', () => {
    render(<TestComponent />, {
      idctaConfig: mockIdctaConfig,
      service: 'hindi',
    });

    const testEl = screen.getByTestId('test-component');
    const context = JSON.parse(testEl.textContent as string);

    expect(context).toHaveProperty('isIdctaAvailable');
    expect(context).toHaveProperty('isSignedIn');
    expect(context).toHaveProperty('signInUrl');
    expect(context).toHaveProperty('registerUrl');
    expect(context).toHaveProperty('settingsUrl');
    expect(context).toHaveProperty('signOutUrl');
    expect(context).toHaveProperty('forYouUrl');
  });

  it('should set isIdctaAvailable to true when id-availability is GREEN', () => {
    render(<TestComponent />, {
      idctaConfig: mockIdctaConfig,
      service: 'hindi',
    });

    const testEl = screen.getByTestId('test-component');
    const context = JSON.parse(testEl.textContent as string);

    expect(context.isIdctaAvailable).toBe(true);
  });

  it('should set isIdctaAvailable to false when id-availability is not GREEN', () => {
    const config = {
      ...mockIdctaConfig,
      'id-availability': 'RED',
    } as IdctaConfig;

    render(<TestComponent />, {
      idctaConfig: config,
      service: 'hindi',
    });

    const testEl = screen.getByTestId('test-component');
    const context = JSON.parse(testEl.textContent as string);

    expect(context.isIdctaAvailable).toBe(false);
  });

  it('should set isIdctaAvailable to false when initialConfig is null', () => {
    render(<TestComponent />, {
      idctaConfig: null,
      service: 'hindi',
    });

    const testEl = screen.getByTestId('test-component');
    const context = JSON.parse(testEl.textContent as string);

    expect(context.isIdctaAvailable).toBe(false);
  });

  it('should build signInUrl with correct query parameters when IDCTA is available', async () => {
    render(<TestComponent />, {
      idctaConfig: mockIdctaConfig,
      service: 'hindi',
    });

    await waitFor(() => {
      const testEl = screen.getByTestId('test-component');
      const context = JSON.parse(testEl.textContent as string);

      expect(context.signInUrl).toContain(mockIdctaConfig.signin_url);
      expect(context.signInUrl).toContain('lang=hi-IN');
    });
  });

  it('should return unavailable_url for all URLs when IDCTA is not available', () => {
    const config = {
      ...mockIdctaConfig,
      'id-availability': 'RED',
    } as IdctaConfig;

    render(<TestComponent />, {
      idctaConfig: config,
      service: 'hindi',
    });

    const testEl = screen.getByTestId('test-component');
    const context = JSON.parse(testEl.textContent as string);

    expect(context.signInUrl).toBe(mockIdctaConfig.unavailable_url);
    expect(context.registerUrl).toBe(mockIdctaConfig.unavailable_url);
    expect(context.settingsUrl).toBe(mockIdctaConfig.unavailable_url);
    expect(context.signOutUrl).toBe(mockIdctaConfig.unavailable_url);
    expect(context.forYouUrl).toBe(mockIdctaConfig.unavailable_url);
  });

  it('should set isSignedIn to true when IDCTA is available and initialIsSignedIn is true', () => {
    render(<TestComponent />, {
      idctaConfig: mockIdctaConfig,
      service: 'hindi',
    });

    const testEl = screen.getByTestId('test-component');
    const context = JSON.parse(testEl.textContent as string);

    expect(context.isSignedIn).toBe(true);
  });

  it('should set isSignedIn to false when IDCTA is available but initialIsSignedIn is false', () => {
    render(<TestComponent />, {
      idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: false },
      service: 'hindi',
    });

    const testEl = screen.getByTestId('test-component');
    const context = JSON.parse(testEl.textContent as string);

    expect(context.isSignedIn).toBe(false);
  });

  it('should set isSignedIn to false when IDCTA is not available regardless of initialIsSignedIn', () => {
    const config = {
      ...mockIdctaConfig,
      'id-availability': 'RED',
    } as IdctaConfig;

    render(<TestComponent />, {
      idctaConfig: config,
      service: 'hindi',
    });

    const testEl = screen.getByTestId('test-component');
    const context = JSON.parse(testEl.textContent as string);

    expect(context.isSignedIn).toBe(false);
  });

  it('should handle null initialConfig gracefully', () => {
    render(<TestComponent />, {
      idctaConfig: null,
      service: 'hindi',
    });

    const testEl = screen.getByTestId('test-component');
    const context = JSON.parse(testEl.textContent as string);

    expect(context.isIdctaAvailable).toBe(false);
    expect(context.isSignedIn).toBe(false);
    expect(context.signInUrl).toBeUndefined();
  });

  it('should set isRefreshAvailable to true when IDCTA is available and availability.refresh is GREEN', () => {
    const config = {
      ...mockIdctaConfig,
      availability: { refresh: 'GREEN' },
    } as IdctaConfig;

    render(<TestComponent />, {
      idctaConfig: config,
      service: 'hindi',
    });

    const testEl = screen.getByTestId('test-component');
    const context = JSON.parse(testEl.textContent as string);

    expect(context.isRefreshAvailable).toBe(true);
  });

  it('should set isRefreshAvailable to false when availability.refresh is RED', () => {
    const config = {
      ...mockIdctaConfig,
      availability: { refresh: 'RED' },
    } as IdctaConfig;

    render(<TestComponent />, {
      idctaConfig: config,
      service: 'hindi',
    });

    const testEl = screen.getByTestId('test-component');
    const context = JSON.parse(testEl.textContent as string);

    expect(context.isRefreshAvailable).toBe(false);
  });

  it('should set isRefreshAvailable to false when availability.refresh is missing', () => {
    const config = {
      ...mockIdctaConfig,
      availability: undefined,
    } as IdctaConfig;

    render(<TestComponent />, {
      idctaConfig: config,
      service: 'hindi',
    });

    const testEl = screen.getByTestId('test-component');
    const context = JSON.parse(testEl.textContent as string);

    expect(context.isRefreshAvailable).toBe(false);
  });

  it('should set isRefreshAvailable to false when IDCTA is not available even if availability.refresh is GREEN', () => {
    const config = {
      ...mockIdctaConfig,
      'id-availability': 'RED',
      availability: { refresh: 'GREEN' },
    } as IdctaConfig;

    render(<TestComponent />, {
      idctaConfig: config,
      service: 'hindi',
    });

    const testEl = screen.getByTestId('test-component');
    const context = JSON.parse(testEl.textContent as string);

    expect(context.isRefreshAvailable).toBe(false);
  });

  it('should set isRefreshAvailable to false when initialConfig is null', () => {
    render(<TestComponent />, {
      idctaConfig: null,
      service: 'hindi',
    });

    const testEl = screen.getByTestId('test-component');
    const context = JSON.parse(testEl.textContent as string);

    expect(context.isRefreshAvailable).toBe(false);
  });

  it('should set isPersonalisationOn to false when token contains ep=false opt-out claim', () => {
    mockCookieGet.mockImplementation((cookieName: string) =>
      cookieName === TOKEN_COOKIE_NAME ? 'signed-in-token' : undefined,
    );
    mockGetDecodedToken.mockReturnValue({ ep: false });

    render(<TestComponent />, {
      idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: false },
      service: 'hindi',
    });

    const testEl = screen.getByTestId('test-component');
    const context = JSON.parse(testEl.textContent as string);

    expect(context.isSignedIn).toBe(true);
    expect(context.isArticlePersonalizationEnabled).toBe(true);
    expect(context.isPersonalisationOn).toBe(false);
  });

  it('should set isPersonalisationOn to true when token does not opt out of personalisation', () => {
    mockCookieGet.mockImplementation((cookieName: string) =>
      cookieName === TOKEN_COOKIE_NAME ? 'signed-in-token' : undefined,
    );
    mockGetDecodedToken.mockReturnValue({ ep: true });

    render(<TestComponent />, {
      idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: false },
      service: 'hindi',
    });

    const testEl = screen.getByTestId('test-component');
    const context = JSON.parse(testEl.textContent as string);

    expect(context.isSignedIn).toBe(true);
    expect(context.isArticlePersonalizationEnabled).toBe(true);
    expect(context.isPersonalisationOn).toBe(true);
  });
});
