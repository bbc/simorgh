/* eslint-disable global-require */
import loggerMock from '#testHelpers/loggerMock';
import { ATI_LOGGING_ERROR } from '#app/lib/logger.const';
import { ReverbBeaconConfig } from '#app/components/ATIAnalytics/types';
import sendBeacon from './index';
import * as onClient from '../../utilities/onClient';

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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // describe('Reverb', () => {
  //   const reverbConfig = {
  //     params: {
  //       page: 'page',
  //       user: '1234-5678',
  //     },
  //     eventDetails: {
  //       eventName: 'pageView',
  //     },
  //   } as unknown as ReverbBeaconConfig;

  //   const reverbViewabilityConfigComponentView = {
  //     params: {
  //       page: {
  //         name: 'page',
  //       },
  //       user: '1234-5678',
  //     },
  //     eventDetails: {
  //       eventName: 'sectionView',
  //       eventPublisher: 'viewability',
  //       item: {
  //         attribution: 'advertiserID',
  //         name: 'scrollable-navigation',
  //         link: 'http://localhost',
  //       },
  //       group: {
  //         name: '1234',
  //       },
  //       event: {
  //         category: 'viewability',
  //         action: 'view',
  //       },
  //       isClick: false,
  //     },
  //   } as unknown as ReverbBeaconConfig;

  //   const reverbViewabilityConfigComponentClick = {
  //     params: {
  //       page: 'page',
  //       user: '1234-5678',
  //     },
  //     eventDetails: {
  //       eventName: 'sectionClick',
  //       eventPublisher: 'viewability',
  //       item: {
  //         attribution: 'advertiserID',
  //         name: 'scrollable-navigation',
  //         link: 'http://localhost',
  //       },
  //       group: {
  //         name: '1234',
  //       },
  //       event: {
  //         category: 'viewability',
  //         action: 'select',
  //       },
  //       isClick: true,
  //     },
  //   } as unknown as ReverbBeaconConfig;

  //   it('should call Reverb viewEvent if Reverb config is passed', async () => {
  //     await sendBeacon(reverbConfig);

  //     expect(reverbMock.viewEvent).toHaveBeenCalledTimes(1);
  //   });

  //   it('should call Reverb userActionEvent if Reverb config is passed for a component view event', async () => {
  //     await sendBeacon(reverbViewabilityConfigComponentView);

  //     expect(reverbMock.userActionEvent).toHaveBeenCalledTimes(1);
  //     expect(reverbMock.userActionEvent).toHaveBeenCalledWith(
  //       'viewability',
  //       '',
  //       {
  //         item: {
  //           attribution: 'advertiserID',
  //           name: 'scrollable-navigation',
  //           link: 'http://localhost',
  //         },
  //         group: {
  //           name: '1234',
  //         },
  //         event: {
  //           category: 'viewability',
  //           action: 'view',
  //         },
  //       },
  //       undefined,
  //       undefined,
  //       false,
  //     );
  //   });

  //   it('should call Reverb userActionEvent if Reverb config is passed for a component click event', async () => {
  //     await sendBeacon(reverbViewabilityConfigComponentClick);

  //     expect(reverbMock.userActionEvent).toHaveBeenCalledTimes(1);
  //     expect(reverbMock.userActionEvent).toHaveBeenCalledWith(
  //       'viewability',
  //       '',
  //       {
  //         item: {
  //           attribution: 'advertiserID',
  //           name: 'scrollable-navigation',
  //           link: 'http://localhost',
  //         },
  //         group: {
  //           name: '1234',
  //         },
  //         event: {
  //           category: 'viewability',
  //           action: 'select',
  //         },
  //       },
  //       undefined,
  //       undefined,
  //       true,
  //     );
  //   });

  //   it(`should not call Reverb when not on client`, async () => {
  //     isOnClient = false;

  //     await sendBeacon(reverbConfig);

  //     expect(reverbMock.viewEvent).not.toHaveBeenCalled();
  //   });
  // });

  describe('Error Handling', () => {
    const error: Error = new Error('An error');

    beforeEach(() => {
      const errorReverbMock = {
        ...reverbMock,
        viewEvent: jest.fn(() => {
          throw error;
        }),
      };
      // eslint-disable-next-line no-underscore-dangle
      window.__reverb = {
        __reverbLoadedPromise: Promise.resolve(errorReverbMock),
      };
    });

    const reverbConfig = {
      params: {
        page: 'page',
        user: '1234-5678',
      },
      eventDetails: {
        eventName: 'pageView',
      },
    } as unknown as ReverbBeaconConfig;

    it(`should send error to logger`, async () => {
      await sendBeacon(reverbConfig);

      expect(loggerMock.error).toHaveBeenCalledWith(ATI_LOGGING_ERROR, {
        error,
      });
    });
  });
});
