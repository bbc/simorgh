import { renderHook } from '@testing-library/react-hooks';
import colorthief from './colorthief';
import * as utils from './utils';
import useImageColour from '.';

const mockVibrantResponse = [12, 34, 56];

const mockGetPalette = jest.fn().mockImplementation(() => mockVibrantResponse);

jest.mock('./colorthief', () => {
  return jest.fn().mockImplementation(() => {
    return { getPallette: mockGetPalette };
  });
});

const mockImage =
  'https://ichef.bbci.co.uk/news/976/cpsprodpb/12197/production/_121753147_bdf8b4ad-8b55-42d6-ac50-4e5d19b94cd5.jpg';

describe('useImageColour hook', () => {
  /*
  it('Defers implementation to node-vibrant and the selectColour utility', async () => {
    jest.spyOn(utils, 'selectColour');
    const options = {
      contrastColour: '#ffffff',
      minimumContrast: 5,
      fallbackColour: '#000000',
    };
    const { waitForNextUpdate } = renderHook(() =>
      useImageColour(mockImage, options),
    );

    await waitForNextUpdate({ timeout: 10000 });

    // expect(mockGetPalette).toHaveBeenCalled();
    expect(utils.selectColour).toHaveBeenCalledWith({
      palette: mockVibrantResponse,
      ...options,
    });
  });
  */

  it('returns appropriate data to the calling component', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useImageColour(mockImage),
    );

    console.log(result.current);
    await waitForNextUpdate({ timeout: 10000 });
    console.log(result.current);
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
  /*
  it('handles errors gracefully', async () => {
    mockGetPalette.mockImplementationOnce(() => throw new Error('!!'));

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
  */
});
