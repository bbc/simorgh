import {
  renderHook,
  fireEvent,
} from '#app/components/react-testing-library-with-providers';
import { renderHook as renderSSRHook } from '@testing-library/react-hooks/server';
import useLocation from '.';

describe('useLocation', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('preserves the empty search snapshot during server rendering', () => {
    window.history.replaceState({}, '', '/?client-only=true');
    const { result } = renderSSRHook(() => useLocation());

    expect(result.current.search).toBe('');
  });
  it('should set location to the current window location', () => {
    const { result } = renderHook(() => useLocation());

    const articleURL = 'http://localhost/articles/cx000';
    window.history.pushState({}, '', new URL(articleURL));

    expect(result.current.href).toBe(articleURL);
  });

  it('should set the hash attribute of the location object', () => {
    const { result } = renderHook(() => useLocation());

    const articleURL = 'http://localhost/articles/cx000';
    window.history.pushState({}, '', new URL(`${articleURL}#content`));

    expect(result.current.href).toBe(`${articleURL}#content`);
    expect(result.current.hash).toBe('#content');
  });

  it('should remove the event listeners when the component unmounts', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { rerender, unmount } = renderHook(() => useLocation());
    const popstateListener = addEventListenerSpy.mock.calls.find(
      ([name]) => name === 'popstate',
    )?.[1];

    rerender();

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'popstate',
      popstateListener,
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'hashchange',
      popstateListener,
    );
    expect(
      addEventListenerSpy.mock.calls.filter(([name]) => name === 'popstate'),
    ).toHaveLength(1);
  });

  it('updates consumers on popstate even though window.location is mutable', () => {
    const { result } = renderHook(() => useLocation().search);

    window.history.pushState({}, '', '/?page=2');
    fireEvent(window, new window.PopStateEvent('popstate'));

    expect(result.current).toBe('?page=2');

    window.history.replaceState({}, '', '/?page=3');
    fireEvent(window, new window.PopStateEvent('popstate'));

    expect(result.current).toBe('?page=3');
  });

  it('updates consumers on hash changes', () => {
    const { result } = renderHook(() => useLocation().hash);

    window.history.replaceState({}, '', '/#content');
    fireEvent(window, new window.HashChangeEvent('hashchange'));

    expect(result.current).toBe('#content');
  });
});
