import { LITE_ATI_VIEW_TRACKING } from '#app/hooks/useViewTracker';
import viewTracking from '.';

jest.useFakeTimers();

describe('View tracking script', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    window.processClientDeviceAndSendLite = jest.fn();
  });

  it('Calls processClientDeviceAndSendLite() when the IntersectionObserver marks it as intersecting.', () => {
    const anchorElement = document.createElement('a');
    anchorElement.setAttribute(
      LITE_ATI_VIEW_TRACKING,
      'https://logws1363.ati-host.net/?',
    );
    const mockElement = { isIntersecting: true, target: anchorElement };

    jest
      .spyOn(document, 'querySelectorAll')
      .mockReturnValueOnce([mockElement] as unknown as NodeListOf<Element>);

    viewTracking();
    document.dispatchEvent(new Event('triggerMockObserver'));
    jest.runAllTimers();

    expect(
      window.processClientDeviceAndSendLite as jest.Mock,
    ).toHaveBeenCalledWith('https://logws1363.ati-host.net/?');
  });
});
