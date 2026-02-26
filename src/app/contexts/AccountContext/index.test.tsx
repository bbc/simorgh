/* eslint-disable @typescript-eslint/no-explicit-any */
import { use } from 'react';
import onClient from '#app/lib/utilities/onClient';
import { IdctaConfig } from '#app/models/types/account';
import { AccountContext } from '.';
import {
  render,
  screen,
  waitFor,
} from '../../components/react-testing-library-with-providers';

jest.mock('#app/lib/utilities/onClient');

const mockIdctaConfig = {
  'id-availability': 'GREEN',
  signin_url: 'https://example.com/signin',
  register_url: 'https://example.com/register',
  settings_url: 'https://example.com/settings',
  signout_url: 'https://example.com/signout',
  foryou_url: 'https://example.com/foryou',
  unavailable_url: 'https://example.com/unavailable',
  initialIsSignedIn: true,
  identity: {
    idSignedInCookieName: 'ckns_id',
  },
} as IdctaConfig;

describe('AccountContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (onClient as jest.Mock).mockReturnValue(true);

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
});
