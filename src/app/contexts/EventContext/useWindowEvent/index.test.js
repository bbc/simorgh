import { useEffect } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useWindowEvent from './index';

afterEach(() => {
  jest.clearAllMocks();
});

describe('useWindowEvent', () => {
  const fn1 = jest.fn();

  it('should trigger window click handler', () => {
    useWindowEvent('click', fn1, false)();

    window.dispatchEvent(new Event('click'));

    expect(fn1).toHaveBeenCalled();
  });

  it('should cleanup', () => {
    const fn2 = jest.fn();
    const { unmount } = renderHook(() => {
      useEffect(useWindowEvent('click', fn2, false));
    });

    window.dispatchEvent(new Event('click'));

    expect(fn2).toHaveBeenCalledTimes(1);

    unmount();

    window.dispatchEvent(new Event('click'));

    expect(fn2).toHaveBeenCalledTimes(1);
  });
});
