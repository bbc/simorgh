/* eslint-disable global-require */
import loggerMock from '#testHelpers/loggerMock';
import { ATI_LOGGING_ERROR } from '#app/lib/logger.const';
import sendBeacon from './index';
import * as onClient from '../../utilities/onClient';

let fetchResponse;
let isOnClient;

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
    fetch.mockImplementation(() => fetchResponse);
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
    };

    const reverbConfigComponentView = {
      params: {
        page: 'page',
        user: '1234-5678',
      },
      eventDetails: {
        eventName: 'sectionView',
        eventPublisher: 'impression',
        componentName: 'scrollable-navigation',
        container: '1234',
        attribute: 'scrollable-navigation',
        metadata: 'format',
        placement: 'pageIdentifier',
        source: 'advertiserID',
        result: 'http://localhost',
        isClick: false,
      },
    };

    const reverbConfigComponentClick = {
      params: {
        page: 'page',
        user: '1234-5678',
      },
      eventDetails: {
        eventName: 'sectionClick',
        eventPublisher: 'click',
        componentName: 'scrollable-navigation',
        container: '1234',
        attribute: 'scrollable-navigation',
        metadata: 'format',
        placement: 'pageIdentifier',
        source: 'advertiserID',
        result: 'http://localhost',
        isClick: true,
      },
    };

    // Simulates reverbBeaconConfig set to null in ATIAnalytics and sendEventBeacon
    // in the event useReverb resolves to 'false'
    const reverbConfigWhenReverbIsDisabled = null;

    const originalProcessEnv = process.env;

    afterEach(() => {
      process.env = originalProcessEnv;
    });

    describe('LOCAL', () => {
      beforeEach(() => {
        process.env.SIMORGH_APP_ENV = 'local';
      });

      it('should call Reverb viewEvent if Reverb config is passed', async () => {
        await sendBeacon('https://foobar.com', reverbConfig);

        expect(reverbMock.viewEvent).toHaveBeenCalledTimes(1);
      });

      it('should call Reverb userActionEvent if Reverb config is passed for a component view event', async () => {
        await sendBeacon('https://foobar.com', reverbConfigComponentView);

        expect(reverbMock.userActionEvent).toHaveBeenCalledTimes(1);
        expect(reverbMock.userActionEvent).toHaveBeenCalledWith(
          'impression',
          'scrollable-navigation',
          {
            container: '1234',
            attribute: 'scrollable-navigation',
            placement: 'pageIdentifier',
            source: 'advertiserID',
            result: 'http://localhost',
          },
          undefined,
          undefined,
          false,
        );
      });

      it('should call Reverb userActionEvent if Reverb config is passed for a component click event', async () => {
        await sendBeacon('https://foobar.com', reverbConfigComponentClick);

        expect(reverbMock.userActionEvent).toHaveBeenCalledTimes(1);
        expect(reverbMock.userActionEvent).toHaveBeenCalledWith(
          'click',
          'scrollable-navigation',
          {
            container: '1234',
            attribute: 'scrollable-navigation',
            placement: 'pageIdentifier',
            source: 'advertiserID',
            result: 'http://localhost',
          },
          undefined,
          undefined,
          true,
        );
      });

      it('should not call Reverb viewEvent if Reverb is not enabled for a service', async () => {
        await sendBeacon(
          'https://foobar.com',
          reverbConfigWhenReverbIsDisabled,
        );

        expect(reverbMock.viewEvent).not.toHaveBeenCalled();
      });

      it('should not call "fetch" if Reverb config is passed', async () => {
        await sendBeacon('https://foobar.com', reverbConfig);

        expect(fetch).not.toHaveBeenCalled();
      });
    });

    describe('TEST', () => {
      beforeEach(() => {
        process.env.SIMORGH_APP_ENV = 'test';
      });

      it('should call Reverb viewEvent if Reverb config is passed', async () => {
        await sendBeacon('https://foobar.com', reverbConfig);

        expect(reverbMock.viewEvent).toHaveBeenCalledTimes(1);
      });

      it('should call Reverb userActionEvent if Reverb config is passed for a component view event', async () => {
        await sendBeacon('https://foobar.com', reverbConfigComponentView);

        expect(reverbMock.userActionEvent).toHaveBeenCalledTimes(1);
        expect(reverbMock.userActionEvent).toHaveBeenCalledWith(
          'impression',
          'scrollable-navigation',
          {
            container: '1234',
            attribute: 'scrollable-navigation',
            placement: 'pageIdentifier',
            source: 'advertiserID',
            result: 'http://localhost',
          },
          undefined,
          undefined,
          false,
        );
      });

      it('should call Reverb userActionEvent if Reverb config is passed for a component click event', async () => {
        await sendBeacon('https://foobar.com', reverbConfigComponentClick);

        expect(reverbMock.userActionEvent).toHaveBeenCalledTimes(1);
        expect(reverbMock.userActionEvent).toHaveBeenCalledWith(
          'click',
          'scrollable-navigation',
          {
            container: '1234',
            attribute: 'scrollable-navigation',
            placement: 'pageIdentifier',
            source: 'advertiserID',
            result: 'http://localhost',
          },
          undefined,
          undefined,
          true,
        );
      });

      it('should not call Reverb viewEvent if Reverb is not enabled for a service', async () => {
        await sendBeacon(
          'https://foobar.com',
          reverbConfigWhenReverbIsDisabled,
        );

        expect(reverbMock.viewEvent).not.toHaveBeenCalled();
      });

      it('should not call "fetch" if Reverb config is passed', async () => {
        await sendBeacon('https://foobar.com', reverbConfig);

        expect(fetch).not.toHaveBeenCalled();
      });
    });

    describe('LIVE', () => {
      beforeEach(() => {
        process.env.SIMORGH_APP_ENV = 'live';
      });

      it('should call Reverb viewEvent if Reverb config is passed', async () => {
        await sendBeacon('https://foobar.com', reverbConfig);

        expect(reverbMock.viewEvent).toHaveBeenCalled();
      });

      it('should call Reverb userActionEvent if Reverb config is passed for a component view event', async () => {
        await sendBeacon('https://foobar.com', reverbConfigComponentView);

        expect(reverbMock.userActionEvent).toHaveBeenCalledTimes(1);
        expect(reverbMock.userActionEvent).toHaveBeenCalledWith(
          'impression',
          'scrollable-navigation',
          {
            container: '1234',
            attribute: 'scrollable-navigation',
            placement: 'pageIdentifier',
            source: 'advertiserID',
            result: 'http://localhost',
          },
          undefined,
          undefined,
          false,
        );
      });

      it('should call Reverb userActionEvent if Reverb config is passed for a component click event', async () => {
        await sendBeacon('https://foobar.com', reverbConfigComponentClick);

        expect(reverbMock.userActionEvent).toHaveBeenCalledTimes(1);
        expect(reverbMock.userActionEvent).toHaveBeenCalledWith(
          'click',
          'scrollable-navigation',
          {
            container: '1234',
            attribute: 'scrollable-navigation',
            placement: 'pageIdentifier',
            source: 'advertiserID',
            result: 'http://localhost',
          },
          undefined,
          undefined,
          true,
        );
      });

      it('should not call Reverb viewEvent if Reverb is not enabled for a service', async () => {
        await sendBeacon(
          'https://foobar.com',
          reverbConfigWhenReverbIsDisabled,
        );

        expect(reverbMock.viewEvent).not.toHaveBeenCalled();
      });

      it('should not call "fetch" when Reverb config is passed', async () => {
        await sendBeacon('https://foobar.com', reverbConfig);

        expect(fetch).not.toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when the fetch fails', () => {
    let error;

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
