import { renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import useLocation, * as useLocationObj from '.';

describe('useLocation', () => {
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
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useLocation());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalled();
  });

  it('should update itself on user popstate interaction ', () => {
    const spy = jest.spyOn(useLocationObj, 'default');

    renderHook(() => useLocationObj.default());

    fireEvent(window, new window.PopStateEvent('popstate'));
    fireEvent(window, new window.PopStateEvent('popstate'));
    fireEvent(window, new window.PopStateEvent('popstate'));

    expect(spy).toBeCalledTimes(3);
  });
});
