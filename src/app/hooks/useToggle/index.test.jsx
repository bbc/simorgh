/* eslint react/prop-types: 0 */
import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';
import useToggle from '.';
import { ToggleContextProvider } from '#contexts/ToggleContext';

describe('useToggle custom hook', () => {
  describe('Given ads toggle that is fetched from the toggle service is enabled', () => {
    it('return enabled true', async () => {
      const mockToggles = {
        ads: {
          enabled: true,
        },
      };

      let result;
      const wrapper = ({ children }) => (
        <ToggleContextProvider remoteToggles={mockToggles}>
          {children}
        </ToggleContextProvider>
      );

      await act(async () => {
        result = renderHook(() => useToggle('ads'), { wrapper }).result;
      });

      expect(result.current).toEqual({ enabled: true });
    });
  });

  describe('Given ads toggle that is fetched from the toggle service is disabled', () => {
    it('return enabled false', async () => {
      const mockToggles = {
        ads: {
          enabled: false,
        },
      };
      let result;
      const wrapper = ({ children }) => (
        <ToggleContextProvider remoteToggles={mockToggles}>
          {children}
        </ToggleContextProvider>
      );

      await act(async () => {
        result = renderHook(() => useToggle('ads'), { wrapper }).result;
      });

      expect(result.current).toEqual({ enabled: false });
    });
  });
});
