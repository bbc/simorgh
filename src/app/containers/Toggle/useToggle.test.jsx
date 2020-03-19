/* eslint-disable no-console */
/* eslint react/prop-types: 0 */
import React from 'react';
import fetchMock from 'fetch-mock';
import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';
import useToggle from './useToggle';
import { ToggleContextProvider } from '#contexts/ToggleContext';

jest.mock('../../lib/config/toggles/index.js', () => ({
  test: {
    enableFetchingToggles: {
      enabled: true,
      value: 'mundo',
    },
    ads: {
      enabled: true,
    },
  },
}));

const togglesUrl =
  'https://mock-toggles-endpoint.bbc.co.uk/toggles?application=simorgh&service=mundo&__amp_source_origin=https://www.test.bbc.com&geoiplookup=true';

beforeEach(() => {
  process.env.SIMORGH_APP_ENV = 'test';
  process.env.SIMORGH_TOGGLES_URL = 'https://mock-toggles-endpoint.bbc.co.uk';

  fetchMock.restore();
});

describe('useToggle custom hook', () => {
  describe('Given ads toggle that is fetched from the toggle service is enabled', () => {
    it('return enabled true', async () => {
      fetchMock.mock(togglesUrl, {
        toggles: {
          ads: {
            enabled: true,
            value: '',
          },
        },
      });
      let result;
      const wrapper = ({ children }) => (
        <ToggleContextProvider
          service="mundo"
          origin="https://www.test.bbc.com"
        >
          {children}
        </ToggleContextProvider>
      );

      await act(async () => {
        result = renderHook(() => useToggle('ads'), { wrapper }).result;
      });

      expect(result.current).toEqual({ enabled: true, value: '' });
    });
  });

  describe('Given ads toggle that is fetched from the toggle service is disabled', () => {
    it('return enabled false', async () => {
      fetchMock.mock(togglesUrl, {
        toggles: {
          ads: {
            enabled: false,
            value: '',
          },
        },
      });
      let result;
      const wrapper = ({ children }) => (
        <ToggleContextProvider
          service="mundo"
          origin="https://www.test.bbc.com"
        >
          {children}
        </ToggleContextProvider>
      );

      await act(async () => {
        result = renderHook(() => useToggle('ads'), { wrapper }).result;
      });

      expect(result.current).toEqual({ enabled: false, value: '' });
    });
  });

  describe('Given ads toggle that is fetched from the toggle service does not exist', () => {
    it('return enabled null', async () => {
      fetchMock.mock(togglesUrl, {
        toggles: {
          ads: {
            enabled: false,
            value: '',
          },
        },
      });
      let result;
      const wrapper = ({ children }) => (
        <ToggleContextProvider
          service="mundo"
          origin="https://www.test.bbc.com"
        >
          {children}
        </ToggleContextProvider>
      );

      await act(async () => {
        result = renderHook(() => useToggle('toggle-that-does-not-exist'), {
          wrapper,
        }).result;
      });

      expect(result.current).toEqual({ enabled: null });
    });
  });

  describe('Given ads toggle that is fetched from the toggle service returns a 503', () => {
    it('should log the fetch error', async () => {
      console.error = jest.fn();
      fetchMock.mock(togglesUrl, 503);
      const wrapper = ({ children }) => (
        <ToggleContextProvider
          service="mundo"
          origin="https://www.test.bbc.com"
        >
          {children}
        </ToggleContextProvider>
      );

      await act(async () => {
        renderHook(() => useToggle('ads'), {
          wrapper,
        });
      });

      expect(console.error).toHaveBeenCalledWith(
        `error - ${JSON.stringify(
          { event: 'toggle_fetch_error', message: {} },
          null,
          2,
        )}`,
      );
    });
  });
});
