import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { isNull } from '@bbc/psammead-test-helpers';
import useToggle from '#hooks/useToggle';
import loggerMock from '#testHelpers/loggerMock';
import MPulseBeaconContainer from './index';
import onClient from '#lib/utilities/onClient';
import boomr from './boomr';
import { UserContext } from '#contexts/UserContext';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';

let container;
const useToggleMock = enabled => ({ enabled });

jest.mock('./boomr', () => jest.fn());
jest.mock('#hooks/useToggle', () => jest.fn());
jest.mock('#lib/utilities/onClient', () => jest.fn());

let serviceContextMock;
let requestContextMock;
let userContextMock;

const ContextWrappedMPulse = () => (
  <ServiceContext.Provider value={serviceContextMock}>
    <RequestContext.Provider value={requestContextMock}>
      <UserContext.Provider value={userContextMock}>
        <MPulseBeaconContainer />
      </UserContext.Provider>
    </RequestContext.Provider>
  </ServiceContext.Provider>
);

describe('MPulseBeacon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useToggle.mockReturnValue(useToggleMock(true));
    onClient.mockReturnValue(true);
    process.env.SIMORGH_MPULSE_API_KEY = 'APIKey';
    container = document.createElement('div');
    document.body.appendChild(container);

    serviceContextMock = { service: 'news' };
    requestContextMock = { pageType: 'article', statusCode: 200 };
    userContextMock = { personalisationEnabled: true };

    delete window.SIMORGH_MPULSE_INFO;
  });

  isNull('should not render any react components', <ContextWrappedMPulse />);

  it('should call boomr when all info is provided', () => {
    act(() => {
      ReactDOM.render(<ContextWrappedMPulse />, container);
    });

    expect(boomr).toHaveBeenCalledTimes(1);
    expect(useToggle).toHaveBeenCalledWith('mpulse');
    expect(loggerMock.error).not.toHaveBeenCalled();
  });

  it('should set pageType, service & statusCode to window', () => {
    expect(window.SIMORGH_MPULSE_INFO).toBeUndefined();

    act(() => {
      ReactDOM.render(<ContextWrappedMPulse />, container);
    });

    expect(window.SIMORGH_MPULSE_INFO).toEqual({
      pageType: 'article',
      service: 'news',
      statusCode: 200,
    });
  });

  describe('when toggle is disabled', () => {
    beforeEach(() => {
      useToggle.mockReturnValue(useToggleMock(false));
    });

    it('should not call boomr', () => {
      act(() => {
        ReactDOM.render(<ContextWrappedMPulse />, container);
      });

      expect(boomr).not.toHaveBeenCalled();
      expect(loggerMock.error).not.toHaveBeenCalled();
    });
  });

  describe('when not on client', () => {
    beforeEach(() => {
      onClient.mockReturnValue(false);
    });

    it('should not call boomr', () => {
      act(() => {
        ReactDOM.render(<ContextWrappedMPulse />, container);
      });

      expect(boomr).not.toHaveBeenCalled();
      expect(loggerMock.error).not.toHaveBeenCalled();
    });
  });

  describe('when user doesnt have personalisation enabled', () => {
    beforeEach(() => {
      userContextMock = { personalisationEnabled: false };
    });

    it('should not call boomr', () => {
      act(() => {
        ReactDOM.render(<ContextWrappedMPulse />, container);
      });

      expect(boomr).not.toHaveBeenCalled();
      expect(loggerMock.error).not.toHaveBeenCalled();
    });
  });

  describe('when the API key isnt set', () => {
    beforeEach(() => {
      delete process.env.SIMORGH_MPULSE_API_KEY;
    });

    it('should not call boomr', () => {
      act(() => {
        ReactDOM.render(<ContextWrappedMPulse />, container);
      });

      expect(boomr).not.toHaveBeenCalled();
      expect(loggerMock.error).not.toHaveBeenCalled();
    });
  });

  describe('when boomr throws and error', () => {
    beforeEach(() => {
      boomr.mockImplementation(() => throw new Error());
    });

    it('should not call boomr', () => {
      act(() => {
        ReactDOM.render(<ContextWrappedMPulse />, container);
      });

      expect(boomr).toHaveBeenCalled();
      expect(loggerMock.error).toHaveBeenCalledWith(
        'Error initialising mPulse: "Error"',
      );
    });
  });
});
