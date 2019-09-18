import { sendEventBeacon, sendViewBeacon } from '.';
import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';

let mockSendBeacon = jest.fn();

jest.mock('../../../lib/analyticsUtils/sendBeacon');

describe('beacon', () => {
  beforeEach(() => {
    mockSendBeacon = jest.fn();
    sendBeacon.mockImplementation(mockSendBeacon);
  });

  describe('event', () => {
    it('should call sendBeacon exactly twice', () => {
      sendEventBeacon({
        element: document.createElement('div'),
        type: 'click',
        label: 'test',
      });
      expect(mockSendBeacon).toHaveBeenCalledTimes(2);
    });
  });

  describe('view', () => {
    it('should called sendBeacon exactly once', () => {
      sendViewBeacon({
        element: document.createElement('div'),
        type: 'click',
        label: 'test',
      });
      expect(mockSendBeacon).toHaveBeenCalledTimes(1);
    });
  });
});
