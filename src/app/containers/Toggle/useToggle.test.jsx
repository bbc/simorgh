/* eslint react/prop-types: 0 */
import React from 'react';
import fetchMock from 'fetch-mock';
import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';
import useToggle from './useToggle';
import { ToggleContextProvider } from '#contexts/ToggleContext';

process.env.SIMORGH_APP_ENV = 'test';
process.env.SIMORGH_TOGGLES_URL = 'https://mock-toggles-endpoint.bbc.co.uk';

const togglesUrl = `https://mock-toggles-endpoint.bbc.co.uk/toggles?application=simorgh&service=mundo&__amp_source_origin=https://www.test.bbc.com&geoiplookup=true`;

afterEach(() => {
  fetchMock.restore();
});

describe('useToggle custom hook', () => {
  describe('Given ads toggle that is fetched from the toggle service is enabled', () => {
    beforeEach(() => {
      fetchMock.mock(togglesUrl, {
        toggles: {
          ads: {
            enabled: true,
            value: '',
          },
        },
      });
    });

    it('return enabled true', async () => {
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
    afterEach(() => {
      fetchMock.restore();
    });
    beforeEach(() => {
      fetchMock.mock(togglesUrl, {
        toggles: {
          ads: {
            enabled: false,
            value: '',
          },
        },
      });
    });

    it('return enabled false', async () => {
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
    afterEach(() => {
      fetchMock.restore();
    });
    beforeEach(() => {
      fetchMock.mock(togglesUrl, {
        toggles: {
          ads: {
            enabled: false,
            value: '',
          },
        },
      });
    });

    it('return enabled null', async () => {
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
});
