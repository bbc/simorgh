import { renderHook } from '@testing-library/react-hooks';
import useLocation from '.';

describe('useLocation', () => {
  it('should set location to the current window location', () => {
    renderHook(() => useLocation());

    const articleURL = 'http://localhost/articles/cx000';
    window.history.pushState({}, '', new URL(articleURL));

    expect(window.location.href).toBe(articleURL);
  });
  it('should update the location when anchor hashes change', () => {
    renderHook(() => useLocation());

    const articleURL = 'http://localhost/articles/cx000';
    window.history.pushState({}, '', new URL(articleURL));
    window.history.pushState({}, '', new URL(`${articleURL}#content`));

    expect(window.location.href).toBe(`${articleURL}#content`);
    expect(window.location.hash).toBe('#content');
  });
  it('should remove the event listeners when the component unmounts', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useLocation());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalled();
  });
});
