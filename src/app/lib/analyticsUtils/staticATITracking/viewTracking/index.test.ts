import { STATIC_ATI_VIEW_TRACKING } from '#app/lib/analyticsUtils/analytics.const';
import viewTracker from '.';

jest.useFakeTimers();

describe('View tracking script', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    window.processClientDeviceAndSendStaticBeacon = jest.fn();
  });

  it('STATIC_ATI_VIEW_TRACKING variable is correct', () => {
    const viewTrackerString = viewTracker.toString();

    const pattern = /STATIC_ATI_VIEW_TRACKING = '([^']+)'/;

    const matches = viewTrackerString.match(pattern) || [];
    const [, liteAtiViewTracking] = matches;

    // STATIC_ATI_VIEW_TRACKING in ./index.ts must match the value of STATIC_ATI_VIEW_TRACKING in #app/lib/analyticsUtils/analytics.const
    expect(liteAtiViewTracking).toBe(STATIC_ATI_VIEW_TRACKING);
  });

  it('Calls processClientDeviceAndSendStaticBeacon() when the IntersectionObserver marks it as intersecting.', () => {
    const anchorElement = document.createElement('a');
    anchorElement.setAttribute(
      STATIC_ATI_VIEW_TRACKING,
      'https://logws1363.ati-host.net/?',
    );
    const mockElement = { isIntersecting: true, target: anchorElement };

    jest
      .spyOn(document, 'querySelectorAll')
      .mockReturnValueOnce([mockElement] as unknown as NodeListOf<Element>);

    viewTracker();
    document.dispatchEvent(new Event('triggerMockObserver'));
    jest.runAllTimers();

    expect(
      window.processClientDeviceAndSendStaticBeacon as jest.Mock,
    ).toHaveBeenCalledWith('https://logws1363.ati-host.net/?');
  });

  it('should not call processClientDeviceAndSendStaticBeacon() more than once for the same url', () => {
    const anchorElement = document.createElement('a');
    anchorElement.setAttribute(
      STATIC_ATI_VIEW_TRACKING,
      'https://logws1363.ati-host.net/?',
    );
    const mockElement = { isIntersecting: true, target: anchorElement };

    jest
      .spyOn(document, 'querySelectorAll')
      .mockReturnValueOnce([
        mockElement,
        mockElement,
      ] as unknown as NodeListOf<Element>);

    viewTracker();
    document.dispatchEvent(new Event('triggerMockObserver'));
    jest.runAllTimers();

    expect(
      window.processClientDeviceAndSendStaticBeacon as jest.Mock,
    ).toHaveBeenCalledTimes(1);
  });
});
