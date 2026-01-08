import { render, act } from '../react-testing-library-with-providers';
import PWAPromotionalBanner from './index';
import { PromotionalBannerConfig } from '../PromotionalBanner/index.types';
import { ServiceContext } from '../../contexts/ServiceContext';

const baseBanner: PromotionalBannerConfig = {
  title: 'Install our app',
  description: 'Get the best experience by installing our app.',
  orText: 'or',
  bannerLabel: 'Promotional Banner',
  primaryButton: { text: 'Install', longText: 'Install App' },
  secondaryButton: { text: 'Not now' },
};

const setup = () => {
  return render(
    <ServiceContext.Provider
      // @ts-expect-error: minimal context for test
      value={{ promotionalBanner: baseBanner }}
    >
      <PWAPromotionalBanner />
    </ServiceContext.Provider>,
  );
};

describe('PWAPromotionalBanner', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    Object.defineProperty(window.navigator, 'standalone', {
      value: false,
      writable: true,
    });
  });

  it('should not show banner if dismissed recently', () => {
    localStorage.setItem('pwa_promotional_banner_dismissals', '1');
    localStorage.setItem(
      'pwa_promotional_banner_last_dismissed',
      `${Date.now()}`,
    );
    act(() => {
      const customEvent = new CustomEvent('beforeinstallprompt');
      window.dispatchEvent(customEvent);
    });
    const { queryByText } = setup();
    expect(queryByText('Install our app')).not.toBeInTheDocument();
  });
});
