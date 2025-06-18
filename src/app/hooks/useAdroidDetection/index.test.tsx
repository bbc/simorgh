/* eslint-disable @typescript-eslint/ban-ts-comment */
import { renderHook } from '@testing-library/react';
import useAndroidDetection from '.';

describe('useAndroidDetection', () => {
  it('Returns true when user is on Android', () => {
    jest
      .spyOn(window, 'navigator', 'get')
      .mockImplementation(() => ({ userAgent: 'Android' }) as Navigator);

    const {
      result: { current },
    } = renderHook(() => useAndroidDetection());
    expect(current).toBe(true);
  });

  it('Returns false when user is NOT on Android', () => {
    jest
      .spyOn(window, 'navigator', 'get')
      .mockImplementation(() => ({ userAgent: 'Mozilla' }) as Navigator);

    const {
      result: { current },
    } = renderHook(() => useAndroidDetection());
    expect(current).toBe(false);
  });
});
