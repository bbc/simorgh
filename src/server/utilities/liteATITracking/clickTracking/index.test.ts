import { LITE_ATI_CLICK_TRACKING } from '#app/lib/analyticsUtils/analytics.const';
import clickTracking from '.';

const createAnchor = ({
  href = '/gahuza',
  isLite = true,
}: {
  href?: string;
  isLite?: boolean;
} = {}) => {
  const anchorElement = document.createElement('a');
  anchorElement.href = href;
  if (isLite) {
    anchorElement.setAttribute(
      LITE_ATI_CLICK_TRACKING,
      'https://logws1363.ati-host.net/?',
    );
  }
  return anchorElement;
};

const dispatchClick = (targetElement: HTMLElement) => {
  document.body.appendChild(targetElement);
  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  targetElement.dispatchEvent(event);
};

describe('Click tracking script', () => {
  const originalWindowLocation = window.location;

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: {
        assign: jest.fn(),
      },
    });
    clickTracking();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    window.processClientDeviceAndSendLite = jest.fn();
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      value: {
        ...originalWindowLocation,
      },
    });
  });

  it('Redirects all clicks', () => {
    const anchorElement = createAnchor({
      href: '/gahuza',
      isLite: false,
    });

    dispatchClick(anchorElement);

    const nextPageUrl = (window.location.assign as jest.Mock).mock.calls[0][0];
    expect(nextPageUrl).toContain('/gahuza');
  });

  it('Calls processClientDeviceAndSendLite() with the right parameters', () => {
    const anchorElement = createAnchor();

    dispatchClick(anchorElement);

    expect(
      window.processClientDeviceAndSendLite as jest.Mock,
    ).toHaveBeenCalledWith('https://logws1363.ati-host.net/?');
  });
});
