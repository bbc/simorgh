/* eslint react/prop-types: 0 */
import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';
import useToggle from '.';
import { ToggleContextProvider } from '#contexts/ToggleContext';

describe('useToggle custom hook', () => {
  describe('Given a remote toggle that is true', () => {
    it('should return enabled true', async () => {
      const mockToggles = {
        testToggle: {
          enabled: true,
        },
      };

      let result;
      const wrapper = ({ children }) => (
        <ToggleContextProvider toggles={mockToggles}>
          {children}
        </ToggleContextProvider>
      );

      await act(async () => {
        result = renderHook(() => useToggle('testToggle'), { wrapper }).result;
      });

      expect(result.current).toEqual({ enabled: true });
    });
  });

  describe('Given a remote toggle that is false', () => {
    it('should return enabled false', async () => {
      const mockToggles = {
        testToggle: {
          enabled: false,
        },
      };
      let result;
      const wrapper = ({ children }) => (
        <ToggleContextProvider toggles={mockToggles}>
          {children}
        </ToggleContextProvider>
      );

      await act(async () => {
        result = renderHook(() => useToggle('testToggle'), { wrapper }).result;
      });

      expect(result.current).toEqual({ enabled: false });
    });
  });
});
