import { render, act } from '../react-testing-library-with-providers';
import PWAPromotionalBanner from './index';

const setup = (props = {}) => {
  return render(<PWAPromotionalBanner {...props} />);
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
    localStorage.setItem('pwa_promotionalBanner_dismissals', '1');
    localStorage.setItem(
      'pwa_promotionalBanner_last_dismissed',
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
