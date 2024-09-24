import { renderHook } from '#app/components/react-testing-library-with-providers';
import { fireEvent } from '@testing-library/react';
import { useState } from 'react';
import useLocation, * as useLocationObj from '.';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('useLocation', () => {
  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(
      jest.requireActual('react').useState,
    );
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
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useLocation());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalled();
  });

  it('should update itself on user popstate interaction', () => {
    const spy = jest.fn();

    (useState as jest.Mock).mockImplementation(() => ['location', spy]);

    renderHook(() => useLocationObj.default());

    fireEvent(window, new window.PopStateEvent('popstate'));
    fireEvent(window, new window.PopStateEvent('popstate'));
    fireEvent(window, new window.PopStateEvent('popstate'));

    expect(spy).toBeCalledTimes(4);
  });
});
