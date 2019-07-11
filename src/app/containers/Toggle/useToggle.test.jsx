/* eslint react/prop-types: 0 */
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useToggle from './useToggle';
import { ToggleContextProvider } from '../../contexts/ToggleContext';

const mockToggles = {
  test: {
    mpulse: {
      enabled: false,
    },
    audioVideo: {
      enabled: true,
    },
  },
  live: {
    mpulse: {
      enabled: false,
    },
    audioVideo: {
      enabled: false,
    },
  },
};

const wrapper = ({ children }) => (
  <ToggleContextProvider value={{ mockToggles }}>
    {children}
  </ToggleContextProvider>
);

test('should return false for mpulse toggle on test', () => {
  const { result } = renderHook(() => useToggle('mpulse', 'test'), {
    wrapper,
  });

  expect(result.current).toBe(false);
});

test('should return false for mpulse toggle on live', () => {
  const { result } = renderHook(() => useToggle('mpulse', 'live'), {
    wrapper,
  });

  expect(result.current).toBe(false);
});

test('should return true for audioVideo toggle on test', () => {
  const { result } = renderHook(() => useToggle('audioVideo', 'test'), {
    wrapper,
  });

  expect(result.current).toBe(true);
});

test('should return false for audioVideo toggle on live', () => {
  const { result } = renderHook(() => useToggle('audioVideo', 'live'), {
    wrapper,
  });

  expect(result.current).toBe(false);
});
