import { useRef, useState } from 'react';
import { renderHook } from '#app/components/react-testing-library-with-providers';
import useScrollUtil from './useScrollUtil';

jest.useFakeTimers();

describe('useScrollUtil', () => {
  it(`Should return null functions if no scrollPane is present`, async () => {
    const scrollPaneRef = { current: null };

    const { result } = renderHook(() =>
      useScrollUtil({
        scrollPaneRef,
        setCanScrollLeft: () => null,
        setCanScrollRight: () => null,
      }),
    );

    const { checkScrollButtons, scroll } = result.current;

    const checkScrollButtonsResult = checkScrollButtons();
    const scrollResult = scroll('right');

    expect(checkScrollButtonsResult).toBe(null);
    expect(scrollResult).toBe(null);
  });
});
