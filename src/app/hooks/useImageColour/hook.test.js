import {
  act,
  renderHook,
} from '#app/components/react-testing-library-with-providers';
import { renderHook as renderSSRHook } from '@testing-library/react-hooks/server';
import ColorThief from './colorthief';
import useImageColour from '.';

jest.mock('./colorthief');

describe('useImageColour', () => {
  const images = [];
  const getPalette = jest.fn();
  const OriginalImage = window.Image;

  beforeEach(() => {
    images.length = 0;
    getPalette.mockReset().mockReturnValue([[255, 0, 0]]);
    ColorThief.mockImplementation(() => ({ getPalette }));
    window.Image = jest.fn().mockImplementation(() => {
      const image = new OriginalImage();
      jest.spyOn(image, 'addEventListener');
      jest.spyOn(image, 'removeEventListener');
      images.push(image);
      return image;
    });
  });

  afterEach(() => {
    window.Image = OriginalImage;
    jest.restoreAllMocks();
  });

  it('does not create images during server rendering', () => {
    const { result } = renderSSRHook(() =>
      useImageColour('/image.jpg', { fallbackColour: '#123456' }),
    );

    expect(window.Image).not.toHaveBeenCalled();
    expect(result.current).toMatchObject({
      colour: { hex: '#123456', isFallback: true },
      isLoading: true,
      error: null,
    });
  });

  it('loads the palette and does not reload when only contrast options change', () => {
    const { result, rerender } = renderHook(
      ({ minimumContrast }) =>
        useImageColour('/image.jpg', { minimumContrast }),
      { initialProps: { minimumContrast: 0 } },
    );

    expect(result.current.isLoading).toBe(true);
    expect(images[0].crossOrigin).toBe('Anonymous');
    expect(images[0].getAttribute('src')).toBe('/image.jpg');

    act(() => images[0].dispatchEvent(new Event('load')));

    expect(getPalette).toHaveBeenCalledWith(images[0], 10);
    expect(result.current).toMatchObject({
      colour: { hex: '#ff0000' },
      isLoading: false,
      error: null,
    });

    rerender({ minimumContrast: 21 });
    expect(result.current.colour.isFallback).toBe(true);
    expect(window.Image).toHaveBeenCalledTimes(1);
  });

  it('cancels old image callbacks when the URL or palette size changes', () => {
    const { result, rerender, unmount } = renderHook(
      ({ url, paletteSize }) => useImageColour(url, { paletteSize }),
      { initialProps: { url: '/first.jpg', paletteSize: 10 } },
    );
    const firstLoad = images[0].addEventListener.mock.calls.find(
      ([name]) => name === 'load',
    )[1];

    rerender({ url: '/second.jpg', paletteSize: 5 });
    expect(images[0].removeEventListener).toHaveBeenCalledWith(
      'load',
      firstLoad,
    );
    expect(images[0].removeEventListener).toHaveBeenCalledWith(
      'error',
      expect.any(Function),
    );

    act(() => firstLoad());
    expect(getPalette).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(true);

    act(() => images[1].dispatchEvent(new Event('load')));
    expect(getPalette).toHaveBeenCalledWith(images[1], 5);
    expect(result.current.colour.hex).toBe('#ff0000');

    unmount();
    expect(images[1].removeEventListener).toHaveBeenCalledWith(
      'load',
      expect.any(Function),
    );
    expect(images[1].removeEventListener).toHaveBeenCalledWith(
      'error',
      expect.any(Function),
    );
  });

  it('ignores a queued load callback after unmount', () => {
    const { unmount } = renderHook(() => useImageColour('/image.jpg'));
    const load = images[0].addEventListener.mock.calls.find(
      ([name]) => name === 'load',
    )[1];

    unmount();
    act(() => load());
    expect(getPalette).not.toHaveBeenCalled();
  });

  it('reports image errors and recovers on a new URL', () => {
    const { result, rerender } = renderHook(url => useImageColour(url), {
      initialProps: '/bad.jpg',
    });
    act(() => images[0].dispatchEvent(new Event('error')));
    expect(result.current).toMatchObject({
      colour: { isFallback: true },
      error: true,
      isLoading: false,
    });

    rerender('/good.jpg');
    expect(result.current.isLoading).toBe(true);
    act(() => images[1].dispatchEvent(new Event('load')));
    expect(result.current.error).toBe(null);
    expect(result.current.colour.hex).toBe('#ff0000');
  });

  it('retains the previous palette while loading the next image', () => {
    const { result, rerender } = renderHook(url => useImageColour(url), {
      initialProps: '/first.jpg',
    });
    act(() => images[0].dispatchEvent(new Event('load')));

    rerender('/second.jpg');
    expect(result.current.isLoading).toBe(true);
    expect(result.current.colour.hex).toBe('#ff0000');

    getPalette.mockReturnValue([[0, 0, 255]]);
    act(() => images[1].dispatchEvent(new Event('load')));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.colour.hex).toBe('#0000ff');
  });

  it('shows loading when returning to a previously loaded URL', () => {
    const { result, rerender } = renderHook(url => useImageColour(url), {
      initialProps: '/first.jpg',
    });
    act(() => images[0].dispatchEvent(new Event('load')));

    rerender('/second.jpg');
    rerender('/first.jpg');
    expect(result.current.isLoading).toBe(true);

    act(() => images[2].dispatchEvent(new Event('load')));
    expect(result.current.isLoading).toBe(false);
  });

  it('reports palette extraction failures', () => {
    getPalette.mockImplementation(() => {
      throw new Error('Canvas unavailable');
    });
    const { result } = renderHook(() => useImageColour('/image.jpg'));
    act(() => images[0].dispatchEvent(new Event('load')));
    expect(result.current).toMatchObject({
      colour: { isFallback: true },
      error: true,
      isLoading: false,
    });
  });

  it('reports synchronous image setup failures without looping subscriptions', () => {
    window.Image.mockImplementation(() => {
      throw new Error('Image unavailable');
    });
    const { result, rerender } = renderHook(() => useImageColour('/image.jpg'));

    expect(result.current.error).toBe(true);
    expect(result.current.isLoading).toBe(false);
    rerender();
    expect(window.Image).toHaveBeenCalledTimes(1);
  });
});
