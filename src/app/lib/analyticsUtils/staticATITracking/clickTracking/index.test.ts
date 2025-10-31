import { STATIC_REVERB_CLICK_TRACKING } from '#app/lib/analyticsUtils/analytics.const';
import { fireEvent } from '#app/components/react-testing-library-with-providers';
import clickTracking from '.';

const createAnchor = ({
  href = '/gahuza',
  isLite = true,
  reverbUrl = 'https://logws1363.xiti.net/?',
}: {
  href?: string;
  isLite?: boolean;
  reverbUrl?: string;
} = {}) => {
  const anchorElement = document.createElement('a');
  anchorElement.href = href;
  if (isLite) {
    anchorElement.setAttribute(STATIC_REVERB_CLICK_TRACKING, reverbUrl);
  }
  document.body.appendChild(anchorElement);
  return anchorElement;
};

const dispatchClick = (targetElement: HTMLElement) => {
  fireEvent.click(targetElement);
};

describe('Click tracking script', () => {
  beforeAll(() => {
    clickTracking();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    window.processClientDeviceAndSendStaticBeacon = jest.fn();
  });

  it('STATIC_ATI_CLICK_TRACKING variable is correct', () => {
    const clickTrackerString = clickTracking.toString();

    const pattern = /STATIC_REVERB_CLICK_TRACKING = '([^']+)'/;

    const matches = clickTrackerString.match(pattern) || [];
    const [, staticAtiClickTracking] = matches;

    // STATIC_ATI_CLICK_TRACKING in ./index.ts must match the value of STATIC_ATI_CLICK_TRACKING in #app/lib/analyticsUtils/analytics.const
    expect(staticAtiClickTracking).toBe(STATIC_REVERB_CLICK_TRACKING);
  });

  it('Redirects all clicks', () => {
    const anchorElement = createAnchor({
      href: '#gahuza',
      isLite: false,
    });

    dispatchClick(anchorElement);

    expect(window.location.toString()).toContain('gahuza');
  });

  it('Calls processClientDeviceAndSendStaticBeacon() with the right parameters', () => {
    const anchorElement = createAnchor();

    dispatchClick(anchorElement);

    expect(
      window.processClientDeviceAndSendStaticBeacon as jest.Mock,
    ).toHaveBeenCalledWith({
      forwardingUrl: 'http://localhost/gahuza',
      reverbUrl: 'https://logws1363.xiti.net/?',
    });
  });

  it('Should NOT call processClientDeviceAndSendStaticBeacon() more than once for the same url', () => {
    const anchorElement = createAnchor({
      reverbUrl: 'https://logws1363.xiti.net/?uniqueLink=1',
    });

    dispatchClick(anchorElement);
    dispatchClick(anchorElement);
    dispatchClick(anchorElement);

    expect(
      window.processClientDeviceAndSendStaticBeacon as jest.Mock,
    ).toHaveBeenCalledTimes(1);
  });
});
