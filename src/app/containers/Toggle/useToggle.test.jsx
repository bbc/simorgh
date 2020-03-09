/* eslint react/prop-types: 0 */
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useToggle from './useToggle';
import { ToggleContextProvider } from '#contexts/ToggleContext';

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn(),
  };
});

const wrapper = ({ children }) => (
  <ToggleContextProvider service="mundo">{children}</ToggleContextProvider>
);

const { useContext } = jest.requireMock('react');

describe('useToggle custom hook', () => {
  afterEach(() => jest.clearAllMocks());
  test('should return true for foo toggle on test', () => {
    useContext.mockReturnValueOnce({ env: 'test' }).mockReturnValueOnce({
      toggleState: {
        test: { foo: { enabled: true } },
        live: { foo: { enabled: false } },
      },
    });

    const { result } = renderHook(() => useToggle('foo'), {
      wrapper,
    });

    expect(result.current.enabled).toBe(true);
  });

  test('should return false for foo toggle on live', () => {
    useContext.mockReturnValueOnce({ env: 'live' }).mockReturnValueOnce({
      toggleState: {
        test: { foo: { enabled: true } },
        live: { foo: { enabled: false } },
      },
    });
    const { result } = renderHook(() => useToggle('foo'), {
      wrapper,
    });

    expect(result.current.enabled).toBe(false);
  });
});
