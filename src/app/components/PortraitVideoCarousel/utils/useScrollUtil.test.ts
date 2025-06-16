import { renderHook } from '#app/components/react-testing-library-with-providers';
import useScrollUtil from './useScrollUtil';

jest.useFakeTimers();

describe('useScrollUtil', () => {
  it(`Should return false canScroll values and a null scroll function if no scrollPane is present`, async () => {
    const scrollPaneRef = { current: null };

    const { result } = renderHook(() =>
      useScrollUtil({
        scrollPaneRef,
      }),
    );

    const { canScrollLeft, canScrollRight, scroll } = result.current;
    const scrollResult = scroll('right');

    expect(scrollResult).toBe(undefined);
    expect(canScrollLeft).toBe(false);
    expect(canScrollRight).toBe(false);
  });
});
