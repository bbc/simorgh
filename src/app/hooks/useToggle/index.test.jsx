import React from 'react';
import {
  renderHook,
  act,
} from '#app/components/react-testing-library-with-providers';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import useToggle from '.';

describe('useToggle custom hook', () => {
  it('should return enabled true if a toggle is true', async () => {
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

  it('should return enabled false if a toggle is false', async () => {
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

  it('should return enabled null if a toggle does not exist', async () => {
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
      result = renderHook(() => useToggle('notAToggle'), { wrapper }).result;
    });

    expect(result.current).toEqual({ enabled: null });
  });
});
