/* eslint-disable global-require */
import loggerMock from '#testHelpers/loggerMock';
import { ATI_LOGGING_ERROR } from '#app/lib/logger.const';
import { ReverbBeaconConfig } from '#app/components/ATIAnalytics/types';
import sendBeacon from './index';
import * as onClient from '../../utilities/onClient';

let fetchResponse: Promise<Response>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let isOnClient: any;

const reverbMock = {
  isReady: jest.fn(),
  initialise: jest.fn(() => Promise.resolve()),
  viewEvent: jest.fn(),
  userActionEvent: jest.fn(),
};

// eslint-disable-next-line no-underscore-dangle
window.__reverb = {
  __reverbLoadedPromise: Promise.resolve(reverbMock),
};

jest.spyOn(onClient, 'default').mockImplementation(() => isOnClient);

describe('sendBeacon', () => {
  beforeEach(() => {
    isOnClient = true;
    (fetch as jest.Mock).mockImplementation(() => fetchResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`should fetch`, () => {
    sendBeacon('https://foobar.com');

    expect(fetch).toHaveBeenCalledWith('https://foobar.com', {
      credentials: 'include',
    });
  });

  it(`should not fetch when not on client`, () => {
    isOnClient = false;

    sendBeacon('https://foobar.com');

    expect(fetch).not.toHaveBeenCalled();
  });

  describe('Reverb', () => {
    const reverbConfig = {
      params: {
        page: 'page',
        user: '1234-5678',
      },
      eventDetails: {
        eventName: 'pageView',
      },
    } as unknown as ReverbBeaconConfig;

    const reverbViewabilityConfigComponentView = {
      params: {
        page: {
          name: 'page',
        },
        user: '1234-5678',
      },
      eventDetails: {
        eventName: 'sectionView',
        eventPublisher: 'viewability',
        item: {
          attribution: 'advertiserID',
          name: 'scrollable-navigation',
          link: 'http://localhost',
        },
        group: {
          name: '1234',
        },
        event: {
          category: 'viewability',
          action: 'view',
        },
        isClick: false,
      },
    } as unknown as ReverbBeaconConfig;

    const reverbViewabilityConfigComponentClick = {
      params: {
        page: 'page',
        user: '1234-5678',
      },
      eventDetails: {
        eventName: 'sectionClick',
        eventPublisher: 'viewability',
        item: {
          attribution: 'advertiserID',
          name: 'scrollable-navigation',
          link: 'http://localhost',
        },
        group: {
          name: '1234',
        },
        event: {
          category: 'viewability',
          action: 'select',
        },
        isClick: true,
      },
    } as unknown as ReverbBeaconConfig;

    // Simulates reverbBeaconConfig set to null in ATIAnalytics and sendEventBeacon
    // in the event useReverb resolves to 'false'
    const reverbConfigWhenReverbIsDisabled = null;

    it('should call Reverb viewEvent if Reverb config is passed', async () => {
      await sendBeacon('https://foobar.com', reverbConfig);

      expect(reverbMock.viewEvent).toHaveBeenCalledTimes(1);
    });

    it('should call Reverb userActionEvent if Reverb config is passed for a component view event', async () => {
      await sendBeacon(
        'https://foobar.com',
        reverbViewabilityConfigComponentView,
      );

      expect(reverbMock.userActionEvent).toHaveBeenCalledTimes(1);
      expect(reverbMock.userActionEvent).toHaveBeenCalledWith(
        'viewability',
        '',
        {
          item: {
            attribution: 'advertiserID',
            name: 'scrollable-navigation',
            link: 'http://localhost',
          },
          group: {
            name: '1234',
          },
          event: {
            category: 'viewability',
            action: 'view',
          },
        },
        undefined,
        undefined,
        false,
      );
    });

    it('should call Reverb userActionEvent if Reverb config is passed for a component click event', async () => {
      await sendBeacon(
        'https://foobar.com',
        reverbViewabilityConfigComponentClick,
      );

      expect(reverbMock.userActionEvent).toHaveBeenCalledTimes(1);
      expect(reverbMock.userActionEvent).toHaveBeenCalledWith(
        'viewability',
        '',
        {
          item: {
            attribution: 'advertiserID',
            name: 'scrollable-navigation',
            link: 'http://localhost',
          },
          group: {
            name: '1234',
          },
          event: {
            category: 'viewability',
            action: 'select',
          },
        },
        undefined,
        undefined,
        true,
      );
    });

    it('should not call Reverb viewEvent if Reverb is not enabled for a service', async () => {
      await sendBeacon('https://foobar.com', reverbConfigWhenReverbIsDisabled);

      expect(reverbMock.viewEvent).not.toHaveBeenCalled();
    });

    it('should not call "fetch" if Reverb config is passed', async () => {
      await sendBeacon('https://foobar.com', reverbConfig);

      expect(fetch).not.toHaveBeenCalled();
    });
  });

  describe('when the fetch fails', () => {
    let error: Error;

    beforeEach(() => {
      error = new Error('An error');
      fetchResponse = Promise.reject(error);
    });

    it(`should send error to logger`, async () => {
      await sendBeacon('https://foobar.com');

      expect(loggerMock.error).toHaveBeenCalledWith(ATI_LOGGING_ERROR, {
        error,
      });
    });
  });
});
