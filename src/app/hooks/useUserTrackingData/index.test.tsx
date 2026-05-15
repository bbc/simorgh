import * as onClientModule from '#lib/utilities/onClient';
import Cookie from 'js-cookie';
import {
  render,
  screen,
} from '../../components/react-testing-library-with-providers';
import useUserTrackingData from './index';

jest.mock('#lib/utilities/onClient');
jest.mock('js-cookie');

const mockOnClient = jest.spyOn(onClientModule, 'default');
const mockCookieGet = Cookie.get as jest.MockedFunction<typeof Cookie.get>;

const mockIdctaConfig = {
  identity: { idSignedInCookieName: 'ckns_id' },
  'id-availability': 'GREEN' as const,
  signin_url: 'http://test',
  register_url: 'http://test',
  settings_url: 'http://test',
  signout_url: 'http://test',
  foryou_url: 'http://test',
  unavailable_url: 'http://test',
};

const TestComponent = () => {
  const data = useUserTrackingData();
  return <div data-testid="data">{JSON.stringify(data)}</div>;
};

describe('useUserTrackingData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockCookieGet.mockReturnValue('' as any);
    mockOnClient.mockReturnValue(true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return isSignedIn: true from context', () => {
    render(<TestComponent />, {
      idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
      service: 'hindi',
    });
    const el = screen.getByTestId('data');
    const data = JSON.parse(el.textContent || '{}');
    expect(data.isSignedIn).toBe(true);
    expect(data.hashedId).toBeNull();
  });

  it('should return isSignedIn: false from context', () => {
    render(<TestComponent />, {
      idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: false },
      service: 'hindi',
    });
    const el = screen.getByTestId('data');
    const data = JSON.parse(el.textContent || '{}');
    expect(data.isSignedIn).toBe(false);
    expect(data.hashedId).toBeNull();
  });

  it('should read ckns_id and ckns_sylphid cookies', () => {
    mockCookieGet.mockImplementation(((name: string) => {
      if (name === 'ckns_id') return 'signed-in';
      if (name === 'ckns_sylphid') return 'hashed-value';
      return '';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any);

    render(<TestComponent />, {
      idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: false },
      service: 'hindi',
    });
    const el = screen.getByTestId('data');
    const data = JSON.parse(el.textContent || '{}');
    expect(data.isSignedIn).toBe(true);
    expect(data.hashedId).toBe('hashed-value');
  });

  it('should handle missing ckns_sylphid cookie', () => {
    mockCookieGet.mockImplementation(((name: string) => {
      if (name === 'ckns_id') return 'signed-in';
      return '';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any);

    render(<TestComponent />, {
      idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: false },
      service: 'hindi',
    });
    const el = screen.getByTestId('data');
    const data = JSON.parse(el.textContent || '{}');
    expect(data.isSignedIn).toBe(true);
    expect(data.hashedId).toBeNull();
  });

  it('should prioritize cookies over context', () => {
    mockCookieGet.mockImplementation(((name: string) => {
      if (name === 'ckns_id') return 'signed-in';
      if (name === 'ckns_sylphid') return 'hashed-value';
      return '';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any);

    render(<TestComponent />, {
      idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: false },
      service: 'hindi',
    });
    const el = screen.getByTestId('data');
    const data = JSON.parse(el.textContent || '{}');
    expect(data.isSignedIn).toBe(true);
    expect(data.hashedId).toBe('hashed-value');
  });

  it('should not call Cookie.get for tracking when onClient is false', () => {
    mockOnClient.mockReturnValue(false);
    mockCookieGet.mockClear();

    render(<TestComponent />, {
      idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
      service: 'hindi',
    });
    expect(mockCookieGet).not.toHaveBeenCalledWith('ckns_id');
    expect(mockCookieGet).not.toHaveBeenCalledWith('ckns_sylphid');
  });

  it('should treat empty string hashedId as null', () => {
    mockCookieGet.mockImplementation(((name: string) => {
      if (name === 'ckns_id') return 'signed-in';
      if (name === 'ckns_sylphid') return '';
      return '';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any);

    render(<TestComponent />, {
      idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: false },
      service: 'hindi',
    });
    const el = screen.getByTestId('data');
    const data = JSON.parse(el.textContent || '{}');
    expect(data.isSignedIn).toBe(true);
    expect(data.hashedId).toBeNull();
  });
});
