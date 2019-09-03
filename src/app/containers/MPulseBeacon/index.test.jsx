import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { isNull } from '@bbc/psammead-test-helpers';
import useToggle from '../Toggle/useToggle';
import { UserContext } from '../../contexts/UserContext';
import loggerMock from '../../../testHelpers/loggerMock';
import MPulseBeaconContainer from './index';
import onClient from '../../lib/utilities/onClient';
import boomr from './boomr';

let container;
const userContextMock = personalisationEnabled => ({ personalisationEnabled });
const useToggleMock = enabled => ({ enabled });

jest.mock('./boomr', () => jest.fn());
jest.mock('../Toggle/useToggle', () => jest.fn());
jest.mock('../../lib/utilities/onClient', () => jest.fn());
jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn(),
  };
});
const { useContext } = jest.requireMock('react');

describe('MPulseBeacon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useContext.mockReturnValue(userContextMock(true));
    useToggle.mockReturnValue(useToggleMock(true));
    onClient.mockReturnValue(true);
    process.env.SIMORGH_MPULSE_API_KEY = 'APIKey';
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  isNull('should not render any react components', <MPulseBeaconContainer />);

  it('should call boomr when all info is provided', () => {
    act(() => {
      ReactDOM.render(<MPulseBeaconContainer />, container);
    });

    expect(boomr).toHaveBeenCalledTimes(1);
    expect(useToggle).toHaveBeenCalledWith('mpulse');
    expect(useContext).toHaveBeenCalledWith(UserContext);
    expect(loggerMock.error).not.toHaveBeenCalled();
  });

  describe('when toggle is disabled', () => {
    beforeEach(() => {
      useToggle.mockReturnValue(useToggleMock(false));
    });

    it('should not call boomr', () => {
      act(() => {
        ReactDOM.render(<MPulseBeaconContainer />, container);
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
        ReactDOM.render(<MPulseBeaconContainer />, container);
      });

      expect(boomr).not.toHaveBeenCalled();
      expect(loggerMock.error).not.toHaveBeenCalled();
    });
  });

  describe('when user doesnt have personalisation enabled', () => {
    beforeEach(() => {
      useContext.mockReturnValue(userContextMock(false));
    });

    it('should not call boomr', () => {
      act(() => {
        ReactDOM.render(<MPulseBeaconContainer />, container);
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
        ReactDOM.render(<MPulseBeaconContainer />, container);
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
        ReactDOM.render(<MPulseBeaconContainer />, container);
      });

      expect(boomr).toHaveBeenCalled();
      expect(loggerMock.error).toHaveBeenCalledWith(
        'Error initialising mPulse: "Error"',
      );
    });
  });
});
