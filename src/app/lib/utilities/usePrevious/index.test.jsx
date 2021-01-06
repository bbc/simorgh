import { renderHook } from '@testing-library/react-hooks';
import usePrevious from '.';

const setUp = () =>
  renderHook(({ state }) => usePrevious(state), {
    initialProps: { state: 'first' },
  });

it('should return null on initial render', () => {
  const { result } = setUp();

  expect(result.current).toBe(null);
});

it('should always return previous state after each update', () => {
  const { result, rerender } = setUp();

  rerender({ state: 'second' });
  expect(result.current).toBe('first');

  rerender({ state: 'third' });
  expect(result.current).toBe('second');

  rerender({ state: 'fourth' });
  expect(result.current).toBe('third');
});
