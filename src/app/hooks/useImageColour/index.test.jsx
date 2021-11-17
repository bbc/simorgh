import { renderHook } from '@testing-library/react-hooks';
import * as utils from './utils';
import useImageColour from '.';

const mockVibrantResponse = {
  Vibrant: {
    hex: '#123456',
  },
};

const mockGetPalette = jest
  .fn()
  .mockImplementation(() => Promise.resolve(mockVibrantResponse));

jest.mock('node-vibrant', () => ({
  from: () => ({
    getPalette: mockGetPalette,
  }),
}));

describe('useImageColour hook', () => {
  it('Defers implementation to node-vibrant and the selectColour utility', async () => {
    jest.spyOn(utils, 'selectColour');
    const options = {
      contrastColour: '#ffffff',
      minimumContrast: 5,
      fallbackColour: '#000000',
    };
    const { waitForNextUpdate } = renderHook(() =>
      useImageColour('some-url', options),
    );

    await waitForNextUpdate();

    expect(mockGetPalette).toHaveBeenCalled();
    expect(utils.selectColour).toHaveBeenCalledWith({
      palette: mockVibrantResponse,
      ...options,
    });
  });

  it('returns appropriate data to the calling component', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useImageColour('some-url'),
    );

    // Initially in a loading state
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.colour.isFallback).toBeTruthy();
    expect(result.current.colour.hex).toBe('#000000');

    // And then transitions to a successful state
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.colour.isFallback).toBeFalsy();
    expect(result.current.colour.hex).toBe(mockVibrantResponse.Vibrant.hex);
  });

  it('handles errors gracefully', async () => {
    mockGetPalette.mockImplementationOnce(() => Promise.reject(Error('')));

    const { result, waitForNextUpdate } = renderHook(() =>
      useImageColour('some-url'),
    );

    // Initially in a loading state
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.colour.isFallback).toBeTruthy();

    // And then transitions to an error state
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.colour.isFallback).toBeTruthy();
  });
});
