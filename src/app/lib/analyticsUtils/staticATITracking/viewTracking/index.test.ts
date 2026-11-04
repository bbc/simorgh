import { STATIC_REVERB_VIEW_TRACKING } from '#app/lib/analyticsUtils/analytics.const';
import viewTracker from '.';

jest.useFakeTimers();

const evaluateStringifiedTracker = (tracker: () => void): (() => void) => {
  // eslint-disable-next-line no-new-func
  return new Function(`return (${tracker.toString()})`)() as () => void;
};

describe('View tracking script', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    window.processClientDeviceAndSendStaticBeacon = jest.fn();
  });

  it('uses the exported tracking attribute with the stringified view tracker when the IntersectionObserver marks it as intersecting.', () => {
    const anchorElement = document.createElement('a');
    anchorElement.setAttribute(
      STATIC_REVERB_VIEW_TRACKING,
      'https://logws1363.xiti.net/?',
    );
    const mockElement = { isIntersecting: true, target: anchorElement };

    jest
      .spyOn(document, 'querySelectorAll')
      .mockReturnValueOnce([mockElement] as unknown as NodeListOf<Element>);

    evaluateStringifiedTracker(viewTracker)();
    document.dispatchEvent(new Event('triggerMockObserver'));
    jest.runAllTimers();

    expect(
      window.processClientDeviceAndSendStaticBeacon as jest.Mock,
    ).toHaveBeenCalledWith({ reverbUrl: 'https://logws1363.xiti.net/?' });
  });

  it('should not call processClientDeviceAndSendStaticBeacon() more than once for the same url', () => {
    const anchorElement = document.createElement('a');
    anchorElement.setAttribute(
      STATIC_REVERB_VIEW_TRACKING,
      'https://logws1363.xiti.net/?',
    );
    const mockElement = { isIntersecting: true, target: anchorElement };

    jest
      .spyOn(document, 'querySelectorAll')
      .mockReturnValueOnce([
        mockElement,
        mockElement,
      ] as unknown as NodeListOf<Element>);

    evaluateStringifiedTracker(viewTracker)();
    document.dispatchEvent(new Event('triggerMockObserver'));
    jest.runAllTimers();

    expect(
      window.processClientDeviceAndSendStaticBeacon as jest.Mock,
    ).toHaveBeenCalledTimes(1);
  });
});
