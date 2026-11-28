/* eslint-disable @typescript-eslint/ban-ts-comment */
import { renderHook } from '#app/components/react-testing-library-with-providers';
import { renderHook as renderSSRHook } from '@testing-library/react-hooks/server';
import useAndroidDetection from '.';

describe('useAndroidDetection', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns false on the server even for an Android user agent', () => {
    jest
      .spyOn(window, 'navigator', 'get')
      .mockImplementation(() => ({ userAgent: 'Android' }) as Navigator);

    const { result } = renderSSRHook(() => useAndroidDetection());
    expect(result.current).toBe(false);
  });

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
